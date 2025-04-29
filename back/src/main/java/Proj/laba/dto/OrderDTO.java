package Proj.laba.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class OrderDTO extends GenericDTO {

    @NotNull(message = "Итоговая цена не может быть пустой")
    @Positive(message = "Итоговая цена должна быть положительным числом")
    private BigDecimal finalPrice;

    @NotNull(message = "Количество не может быть пустым")
    @Min(value = 1, message = "Количество должно быть не менее 1")
    private Integer quantity;


    private LocalDateTime orderDate;

    @NotNull(message = "ID услуги не может быть пустым")
    private Long productServiceId;

    @NotNull(message = "ID пользователя не может быть пустым")
    private Long userId;

    private String status; // "в обработке", "доставляется", "доставлен"
    private String deliveryAddress;
}