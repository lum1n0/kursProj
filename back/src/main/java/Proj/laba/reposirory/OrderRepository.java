package Proj.laba.reposirory;

import Proj.laba.model.Order;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OrderRepository extends GenericRepository<Order> {
    Optional<Order> findByOrderDateAndUserId(LocalDateTime orderDate, Long userId);
}
