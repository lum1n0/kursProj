package Proj.laba.controller.rest;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.model.ProductService;
import Proj.laba.service.ProductServiceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/product-services")
@Tag(name = "Услуги", description = "Контроллер для работы с услугами компании")
@PreAuthorize("hasRole('ADMIN')")
public class ProductServiceController extends GenericController<ProductService, ProductServiceDTO> {

    public ProductServiceController(ProductServiceService productServiceService) {
        super(productServiceService);
    }
}