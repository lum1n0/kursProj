package Proj.laba.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class SpendingReportDTO {
    private String category;
    private BigDecimal totalSpent;
}