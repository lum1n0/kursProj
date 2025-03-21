package Proj.laba.reposirory;

import Proj.laba.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends GenericRepository<Review> {
    List<Review> findByRating(Integer rating);
}
