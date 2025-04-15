package Proj.laba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SupportMessageDTO extends GenericDTO {
    private Long userId;
    private String message;
    private String adminResponse;  // Новое поле для ответа администратора
    private boolean isAnswered;
}