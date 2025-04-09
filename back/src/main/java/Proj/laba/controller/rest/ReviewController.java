package Proj.laba.controller.rest;

import Proj.laba.dto.ReviewDTO;
import Proj.laba.model.Review;
import Proj.laba.service.ReviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@Tag(name = "Reviews", description = "Controller for managing reviews")
public class ReviewController extends GenericController<Review, ReviewDTO> {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        super(reviewService);
        this.reviewService = reviewService;
    }

    @GetMapping("/by-rating/{rating}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByRating(@PathVariable Integer rating) {
        return ResponseEntity.ok(reviewService.findByRating(rating));
    }
}
