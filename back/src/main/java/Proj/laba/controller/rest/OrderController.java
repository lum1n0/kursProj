package Proj.laba.controller.rest;

import Proj.laba.dto.OrderDTO;
import Proj.laba.model.Order;
import Proj.laba.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/orders")
@Tag(name = "Заказы", description = "Контроллер для работы с заказами")
public class OrderController extends GenericController<Order, OrderDTO> {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        super(orderService);
        this.orderService = orderService;
    }

    @Operation(summary = "Поиск заказа по дате и ID пользователя")
    @GetMapping("/by-date-and-user")
    public ResponseEntity<OrderDTO> findByDateAndUser(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime orderDate,
            @RequestParam Long userId) {
        return ResponseEntity.ok(orderService.findByOrderDateAndUserId(orderDate, userId));
    }
}
