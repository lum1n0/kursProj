package Proj.laba.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductServiceDTO extends GenericDTO {

    @NotBlank(message = "Название услуги не может быть пустым")
    private String name;

    @NotNull(message = "Цена не может быть пустой")
    @Positive(message = "Цена должна быть положительным числом")
    private Double price;
}
