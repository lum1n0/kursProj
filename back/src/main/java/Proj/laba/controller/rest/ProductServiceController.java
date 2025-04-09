package Proj.laba.controller.rest;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.model.ProductService;
import Proj.laba.service.ProductServiceService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/product-services")
@Tag(name = "Услуги", description = "Контроллер для работы с услугами компании")
@PreAuthorize("hasRole('ADMIN')")
public class ProductServiceController extends GenericController<ProductService, ProductServiceDTO> {

    private final ProductServiceService productServiceService;

    public ProductServiceController(ProductServiceService productServiceService) {
        super(productServiceService);
        this.productServiceService = productServiceService;
    }

    @PostMapping
    public ResponseEntity<ProductServiceDTO> create(@RequestBody ProductServiceDTO dto) {
        System.out.println("Получен DTO: " + dto.getTitle() + ", categoryId: " + dto.getCategoryId());
        ProductServiceDTO created = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

}