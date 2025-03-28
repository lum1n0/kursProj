package Proj.laba.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class TariffDTO extends GenericDTO {

    private String name;
    private BigDecimal price;
    private String description;
}