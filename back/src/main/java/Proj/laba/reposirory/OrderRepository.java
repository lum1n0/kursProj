package Proj.laba.reposirory;

import Proj.laba.model.Order;
import Proj.laba.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends GenericRepository<Order> {
    Optional<Order> findByOrderDateAndUserId(LocalDateTime orderDate, Long userId);

    @Query("SELECT o FROM Order o WHERE o.user = :user AND o.productService.productCategory.id = :categoryId")
    Optional<Order> findByUserAndProductServiceCategoryId(@Param("user") User user, @Param("categoryId") Long categoryId);

    List<Order> findByUserId(Long userId);

    @EntityGraph(attributePaths = {"productService", "user"})
    Page<Order> findAll(Pageable pageable);

    @Query("SELECT o FROM Order o JOIN FETCH o.productService JOIN FETCH o.user WHERE o.user.id = :userId AND o.productService.productCategory.id IN (1, 2)")
    List<Order> findByUserIdAndCategoryIds(@Param("userId") Long userId);

    @Query("SELECT pc.title AS category, SUM(o.finalPrice) AS totalSpent " +
            "FROM Order o " +
            "JOIN o.productService ps " +
            "JOIN ps.productCategory pc " +
            "WHERE o.user.id = :userId " +
            "AND YEAR(o.orderDate) = :year " +
            "AND MONTH(o.orderDate) = :month " +
            "GROUP BY pc.title")
    List<Object[]> getSpendingReport(@Param("userId") Long userId, @Param("year") int year, @Param("month") int month);
}