package Proj.laba.controller.rest;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.service.ProductServiceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/shop")
public class ShopController {

    private final ProductServiceService productServiceService;

    public ShopController(ProductServiceService productServiceService) {
        this.productServiceService = productServiceService;
    }

    @GetMapping("/products")
    public List<ProductServiceDTO> getAllProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        return productServiceService.searchProducts(name, minPrice, maxPrice);
    }
}