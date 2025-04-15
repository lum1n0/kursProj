package Proj.laba.controller.rest;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.service.ProductServiceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shop")
public class ShopController {

    private final ProductServiceService productService;

    public ShopController(ProductServiceService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<ProductServiceDTO> getAllProducts() {
        return productService.getAllProductsWithCategory();
    }
}