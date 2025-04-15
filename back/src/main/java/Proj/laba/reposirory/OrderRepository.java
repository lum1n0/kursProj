package Proj.laba.reposirory;

import Proj.laba.model.Order;
import Proj.laba.model.User;
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

    // Новый метод для поиска заказа с тарифом из категории id = 3
    @Query("SELECT o FROM Order o WHERE o.user = :user AND o.productService.productCategory.id = :categoryId")
    Optional<Order> findByUserAndProductServiceCategoryId(@Param("user") User user, @Param("categoryId") Long categoryId);

    // Метод для получения всех заказов пользователя
    List<Order> findByUserId(Long userId);
}