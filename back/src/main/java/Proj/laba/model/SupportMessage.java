package Proj.laba.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Entity
@Table(name = "support_messages")
@SequenceGenerator(name = "default_generator", sequenceName = "support_messages_seq", allocationSize = 1)
public class SupportMessage extends GenericModel {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "admin_response")
    private String adminResponse;  // Новое поле для ответа администратора

    @Column(name = "is_answered", nullable = false)
    private boolean isAnswered = false;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "answered_at")
    private LocalDateTime answeredAt;  // Время ответа
}