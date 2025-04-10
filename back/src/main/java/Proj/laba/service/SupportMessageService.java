package Proj.laba.service;

import Proj.laba.dto.SupportMessageDTO;
import Proj.laba.mapper.SupportMessageMapper;
import Proj.laba.model.SupportMessage;
import Proj.laba.model.User;
import Proj.laba.reposirory.SupportMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupportMessageService extends GenericService<SupportMessage, SupportMessageDTO> {

    private final SupportMessageRepository repository;
    private final EmailService emailService;
    private final UserService userService; // Предполагается, что UserService существует

    @Autowired
    public SupportMessageService(SupportMessageRepository repository, SupportMessageMapper mapper,
                                 EmailService emailService, UserService userService) {
        super(repository, mapper);
        this.repository = repository;
        this.emailService = emailService;
        this.userService = userService;
    }

    public void createMessage(SupportMessageDTO dto) {
        if (dto.getMessage() == null || dto.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Сообщение не может быть пустым");
        }
        SupportMessage message = mapper.toEntity(dto);
        message.setAnswered(false);
        repository.save(message);
    }

    public List<SupportMessageDTO> getUnansweredMessages() {
        List<SupportMessage> messages = repository.findByIsAnsweredFalse();
        return mapper.toDTOs(messages);
    }

    public void answerMessage(Long id, String answer) {
        SupportMessage message = repository.findById(id).orElseThrow(() -> new RuntimeException("Сообщение не найдено"));
        User user = userService.getUserById(message.getUserId()); // Предполагается, что метод существует
        emailService.sendEmail(user.getEmail(), "Ответ на ваш вопрос", answer);
        message.setAnswered(true);
        repository.save(message);
    }
}