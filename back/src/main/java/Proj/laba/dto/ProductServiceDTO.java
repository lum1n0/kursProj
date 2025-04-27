package Proj.laba.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class ProductServiceDTO extends GenericDTO {

    @NotBlank(message = "Название услуги не может быть пустым")
    private String name;

    @NotNull(message = "Цена не может быть пустой")
    @Positive(message = "Цена должна быть положительным числом")
    private BigDecimal price;

    @NotBlank(message = "Статус не может быть пустым")
    private String status; // "в наличии", "закончился"

    private String description;

    private String imageUrl;

    private Long categoryId;

    private String title;
}