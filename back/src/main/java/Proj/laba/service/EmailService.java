package Proj.laba.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText("Ответ на ваш вопрос от поддержки: "+ text, false); // false - обычный текст, true - HTML
            helper.setFrom("stm_comp@inbox.ru");
            mailSender.send(message);
        } catch (MailException | MessagingException e) {
            throw new RuntimeException("Не удалось отправить email: " + e.getMessage(), e);
        }
    }
}