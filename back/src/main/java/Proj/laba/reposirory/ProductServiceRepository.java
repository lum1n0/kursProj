package Proj.laba.reposirory;

import Proj.laba.model.ProductService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductServiceRepository extends JpaRepository<ProductService, Long>, GenericRepository<ProductService> {
    @Query("SELECT p FROM ProductService p JOIN FETCH p.productCategory")
    List<ProductService> findAllWithCategory();
}
