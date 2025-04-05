package Proj.laba.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "Информация о пользователе")
public class UserResponseDTO extends GenericDTO {
    @Schema(description = "ID пользователя")
    private Long id;

    @Schema(description = "Логин пользователя")
    private String login;

    @Schema(description = "Имя пользователя")
    private String firstName;

    @Schema(description = "Фамилия пользователя")
    private String lastName;

    @Schema(description = "Email пользователя")
    private String email;

    @Schema(description = "Телефон пользователя")
    private String phone;

    @Schema(description = "Адрес пользователя")
    private String address;

    @Schema(description = "Роль пользователя")
    private String role;

    @Schema(description = "Название тарифа")
    private String tariffName;
}