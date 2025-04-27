package Proj.laba.controller.rest;

import Proj.laba.dto.OrderDTO;
import Proj.laba.model.Order;
import Proj.laba.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Заказы", description = "Контроллер для работы с заказами")
public class OrderController extends GenericController<Order, OrderDTO> {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        super(orderService);
        this.orderService = orderService;
    }

    @Override
    @Operation(summary = "Создать заказ")
    @PostMapping
    public ResponseEntity<OrderDTO> create(@RequestBody OrderDTO orderDTO) {
        OrderDTO createdOrder = orderService.create(orderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @Operation(summary = "Получить заказы пользователя")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserId(@PathVariable Long userId) {
        List<OrderDTO> orders = orderService.findByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @Operation(summary = "Поиск заказа по дате и ID пользователя")
    @GetMapping("/by-date-and-user")
    public ResponseEntity<OrderDTO> findByDateAndUser(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime orderDate,
            @RequestParam Long userId) {
        return ResponseEntity.ok(orderService.findByOrderDateAndUserId(orderDate, userId));
    }
}