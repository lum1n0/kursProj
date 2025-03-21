package Proj.laba.mapper;

import Proj.laba.dto.ReviewDTO;
import Proj.laba.model.Review;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class ReviewMapper extends GenericMapper<Review, ReviewDTO> {

    public ReviewMapper(ModelMapper modelMapper) {
        super(Review.class, ReviewDTO.class, modelMapper);
    }

    @Override
    protected void mapSpecificFields(ReviewDTO source, Review destination) {
        // Add specific mapping logic if needed
    }

    @Override
    protected void mapSpecificFields(Review source, ReviewDTO destination) {
        // Add specific mapping logic if needed
    }

    @Override
    protected List<Long> getIds(Review entity) {
        return Collections.singletonList(entity.getId());
    }
}


