package Proj.laba.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ReviewDTO extends GenericDTO {

    @NotNull(message = "User ID cannot be null")
    private Long userId;

    @NotNull(message = "Product Service ID cannot be null")
    private Long productServiceId;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot be more than 5")
    private Integer rating;

    private String comment;

    private LocalDateTime createdDate;
}
