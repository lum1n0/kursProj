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

    @NotNull(message = "Количество не может быть пустым")
    @Positive(message = "Количество должно быть положительным числом")
    private Integer quantity; // Добавляем quantity

    private String imageUrl;

    private Long categoryId;

    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}