package Proj.laba.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UserHistoryDTO extends GenericDTO {

    private Long userId;
    private String fieldName;
    private String oldValue;
    private String newValue;
    private String changedBy;
    private LocalDateTime changedWhen;
}