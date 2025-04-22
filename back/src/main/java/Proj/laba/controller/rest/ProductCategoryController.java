package Proj.laba.controller.rest;

import Proj.laba.dto.ProductCategoryDTO;
import Proj.laba.model.ProductCategory;
import Proj.laba.service.ProductCategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product-categories")
@Tag(name = "Product Categories", description = "Controller for managing product categories")
public class ProductCategoryController extends GenericController<ProductCategory, ProductCategoryDTO> {

    private final ProductCategoryService productCategoryService;

    public ProductCategoryController(ProductCategoryService productCategoryService) {
        super(productCategoryService);
        this.productCategoryService = productCategoryService;
    }

    // Добавьте этот метод специально для админ-панели
    @GetMapping("/admin/all")
    public ResponseEntity<List<ProductCategoryDTO>> getAllForAdmin() {
        List<ProductCategoryDTO> categories = productCategoryService.listAll();
        return ResponseEntity.ok(categories);
    }
}
