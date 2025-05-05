package Proj.laba.service;

import Proj.laba.model.User;
import Proj.laba.model.ProductService;
import Proj.laba.reposirory.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TariffChargeService {

    private static final Logger log = LoggerFactory.getLogger(TariffChargeService.class);

    private final UserRepository userRepository;
    private final EmailService emailService;

    public TariffChargeService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * ?") // Запускать в полночь каждого дня для проверки
    //@Scheduled(cron = "0 * * * * ?") // каждую минуту
    public void chargeMonthlyTariff() {
        log.info("Запуск проверки ежемесячного списания за тарифы");

        List<User> users = userRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        for (User user : users) {
            ProductService tariff = user.getTariff();
            if (tariff != null && tariff.getProductCategory() != null && tariff.getProductCategory().getId() == 3) {
                LocalDateTime lastChargeDate = user.getLastTariffChargeDate();
                if (lastChargeDate == null) {
                    log.warn("Пользователь {} не имеет даты последнего списания, пропускаем", user.getId());
                    continue;
                }

                LocalDateTime nextChargeDate = lastChargeDate.plusMonths(1);
                if (now.isAfter(nextChargeDate) || now.isEqual(nextChargeDate)) {
                    BigDecimal tariffPrice = tariff.getPrice();
                    if (user.getBalance().compareTo(tariffPrice) >= 0) {
                        user.setBalance(user.getBalance().subtract(tariffPrice));
                        user.setLastTariffChargeDate(now);
                        userRepository.save(user);
                        log.info("Списание {} руб. для пользователя {}", tariffPrice, user.getId());
                        sendChargeNotification(user, tariff, tariffPrice);
                    } else {
                        log.info("Недостаточно средств у пользователя {} для списания {}", user.getId(), tariffPrice);
                        sendInsufficientFundsNotification(user, tariff, tariffPrice);
                    }
                }
            }
        }
    }

    private void sendChargeNotification(User user, ProductService tariff, BigDecimal amount) {
        String subject = "Списание за тариф";
        String message = String.format("Здравствуйте, %s! Произошло списание за ваш тариф \"%s\" в размере %s руб.",
                user.getFirstName(), tariff.getName(), amount.toString());
        try {
            emailService.sendEmail(user.getEmail(), subject, message);
            log.info("Уведомление о списании отправлено пользователю {}", user.getEmail());
        } catch (Exception e) {
            log.error("Ошибка отправки уведомления о списании для {}: {}", user.getEmail(), e.getMessage());
        }
    }

    private void sendInsufficientFundsNotification(User user, ProductService tariff, BigDecimal amount) {
        String subject = "Недостаточно средств для списания за тариф";
        String message = String.format("Здравствуйте, %s! На вашем балансе недостаточно средств для списания за тариф \"%s\" в размере %s руб. Пожалуйста, пополните баланс.",
                user.getFirstName(), tariff.getName(), amount.toString());
        try {
            emailService.sendEmail(user.getEmail(), subject, message);
            log.info("Уведомление о недостатке средств отправлено пользователю {}", user.getEmail());
        } catch (Exception e) {
            log.error("Ошибка отправки уведомления о недостатке средств для {}: {}", user.getEmail(), e.getMessage());
        }
    }
}
