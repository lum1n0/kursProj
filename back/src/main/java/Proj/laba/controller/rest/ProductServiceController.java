// File path: /home/gtr/Рабочий стол/kursProj/back/src/main/java/Proj/laba/controller/rest/ProductServiceController.java
package Proj.laba.controller.rest;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.model.ProductService;
import Proj.laba.service.ProductServiceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/shop")
@Tag(name = "Магазин", description = "Контроллер для работы с магазином")
public class ProductServiceController extends GenericController<ProductService, ProductServiceDTO> {

    private final ProductServiceService productServiceService;

    public ProductServiceController(ProductServiceService productServiceService) {
        super(productServiceService);
        this.productServiceService = productServiceService;
    }

    @GetMapping("/products-all")
    public ResponseEntity<List<ProductServiceDTO>> getAllProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        List<ProductServiceDTO> products = productServiceService.searchProducts(name, minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductServiceDTO> create(@RequestBody ProductServiceDTO dto) {
        System.out.println("Получен DTO: " + dto.getName() + ", categoryId: " + dto.getCategoryId());
        ProductServiceDTO created = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Обработка исключений для некорректных параметров
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest().body("Неверный параметр: " + ex.getMessage());
    }
}
