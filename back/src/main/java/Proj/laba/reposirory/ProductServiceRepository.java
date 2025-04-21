package Proj.laba.reposirory;

import Proj.laba.model.ProductService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductServiceRepository extends JpaRepository<ProductService, Long>, GenericRepository<ProductService> {
    @Query("SELECT p FROM ProductService p JOIN FETCH p.productCategory")
    List<ProductService> findAllWithCategory();

    @Query("SELECT p FROM ProductService p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<ProductService> findByNameContainingIgnoreCase(String name);

    @Query("SELECT p FROM ProductService p WHERE p.price >= :minPrice AND p.price <= :maxPrice")
    List<ProductService> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    @Query("SELECT p FROM ProductService p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) AND p.price >= :minPrice AND p.price <= :maxPrice")
    List<ProductService> findByNameContainingIgnoreCaseAndPriceBetween(String name, BigDecimal minPrice, BigDecimal maxPrice);
}