package Proj.laba.controller.rest;

import Proj.laba.dto.ProductCategoryDTO;
import Proj.laba.model.ProductCategory;
import Proj.laba.service.ProductCategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product-categories")
@Tag(name = "Product Categories", description = "Controller for managing product categories")
public class ProductCategoryController extends GenericController<ProductCategory, ProductCategoryDTO> {

    public ProductCategoryController(ProductCategoryService productCategoryService) {
        super(productCategoryService);
    }
}
