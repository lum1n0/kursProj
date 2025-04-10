package Proj.laba.controller.rest;

import Proj.laba.dto.SupportMessageDTO;
import Proj.laba.service.SupportMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
public class SupportController {

    private final SupportMessageService supportMessageService;

    @Autowired
    public SupportController(SupportMessageService supportMessageService) {
        this.supportMessageService = supportMessageService;
    }

    @PostMapping("/send")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> sendSupportMessage(@RequestBody SupportMessageDTO messageDTO) {
        if (messageDTO.getMessage() == null || messageDTO.getMessage().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Сообщение не может быть пустым");
        }
        try {
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
            supportMessageService.answerMessage(id, answer);
            return ResponseEntity.ok("Ответ отправлен");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Ошибка при отправке ответа: " + e.getMessage());
        }
    }
}