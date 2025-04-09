package Proj.laba.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SimpleRegistrationDTO extends GenericDTO {
    @NotBlank(message = "Логин не может быть пустым")
    @Size(min = 3, max = 50, message = "Логин должен содержать от 3 до 50 символов")
    private String login;

    @NotBlank(message = "Пароль не может быть пустым")
    @Pattern(regexp = ".{8,}", message = "Пароль должен содержать минимум 8 символов")
    private String password;



    @NotBlank(message = "Подтверждение пароля не может быть пустым")
    private String confirmPassword;

    @NotBlank(message = "Email не может быть пустым")
    @Email(message = "Некорректный формат email")
    private String email;
}

