package Proj.laba.controller.rest;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.dto.SupportMessageDTO;
import Proj.laba.model.User;
import Proj.laba.service.SupportMessageService;
import Proj.laba.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/support")
public class SupportController {

    private final SupportMessageService supportMessageService;
    private final UserService userService;

    
    public SupportController(SupportMessageService supportMessageService, UserService userService) {
        this.supportMessageService = supportMessageService;
        this.userService = userService;
    }

    @PostMapping("/send")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> sendSupportMessage(@RequestBody SupportMessageDTO messageDTO, Authentication authentication) {
        String username = authentication.getName(); // Получаем имя пользователя из токена
        User user = userService.findByLogin(username)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        Long userId = user.getId(); // Получаем ID пользователя

        if (messageDTO.getMessage() == null || messageDTO.getMessage().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Сообщение не может быть пустым");
        }
        try {
            messageDTO.setUserId(userId); // Устанавливаем userId из аутентификации
            supportMessageService.createMessage(messageDTO);
            return ResponseEntity.ok("Сообщение отправлено");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Ошибка при отправке сообщения: " + e.getMessage());
        }
    }

    @GetMapping("/admin/unanswered")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SupportMessageDTO>> getUnansweredMessages() {
        List<SupportMessageDTO> messages = supportMessageService.getUnansweredMessages();
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/admin/answer/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> answerMessage(@PathVariable Long id, @RequestBody String answer) {
        try {
            // Декодируем URL-encoded строку в UTF-8
            String decodedAnswer = URLDecoder.decode(answer, StandardCharsets.UTF_8.toString());
            supportMessageService.answerMessage(id, decodedAnswer);
            return ResponseEntity.ok("Ответ отправлен");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Ошибка при отправке ответа: " + e.getMessage());
        }
    }



}