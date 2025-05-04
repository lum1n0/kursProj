package Proj.laba.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MasterRequestDTO extends GenericDTO {

    @NotBlank(message = "Описание не может быть пустым")
    private String description;

    @NotBlank(message = "Адрес не может быть пустым")
    private String address;

    @NotNull(message = "Предпочитаемое время не может быть пустым")
    private LocalDateTime preferredTime;

    @NotBlank(message = "Статус не может быть пустым")
    private String status;

    @NotBlank(message = "Тип заявки не может быть пустым")
    private String requestType;

    @NotNull(message = "ID пользователя не может быть пустым")
    private Long userId;

    private String userFirstName;
    private String userPhone;
}