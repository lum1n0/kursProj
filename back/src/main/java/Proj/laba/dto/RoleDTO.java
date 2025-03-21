package Proj.laba.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class RoleDTO extends GenericDTO {
    @NotBlank(message = "Название роли обязательно")
    @Size(min = 2, max = 50, message = "Название роли должно содержать от 2 до 50 символов")
    private String title;

    @Size(max = 255, message = "Описание не может превышать 255 символов")
    private String description;
}
