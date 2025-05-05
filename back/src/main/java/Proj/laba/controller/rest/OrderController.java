package Proj.laba.controller.rest;

import Proj.laba.dto.OrderDTO;
import Proj.laba.dto.SpendingReportDTO;
import Proj.laba.model.Order;
import Proj.laba.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
        System.out.println("Получен запрос на создание заказа: " + orderDTO);
        OrderDTO createdOrder = orderService.create(orderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @Operation(summary = "Купить товар")
    @PostMapping("/buy")
    public ResponseEntity<OrderDTO> buyProduct(@RequestBody OrderDTO orderDTO) {
        System.out.println("Получен запрос на покупку товара: " + orderDTO);
        OrderDTO createdOrder = orderService.create(orderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @Operation(summary = "Получить заказы пользователя")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserId(@PathVariable Long userId) {
        List<OrderDTO> orders = orderService.findByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @Operation(summary = "Получить заказы пользователя с категориями 1 и 2")
    @GetMapping("/user/{userId}/categories/1-2")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserIdAndCategories(@PathVariable Long userId) {
        List<OrderDTO> orders = orderService.findByUserIdAndCategoryIds(userId);
        return ResponseEntity.ok(orders);
    }

    @Operation(summary = "Поиск заказа по дате и ID пользователя")
    @GetMapping("/by-date-and-user")
    public ResponseEntity<OrderDTO> findByDateAndUser(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime orderDate,
            @RequestParam Long userId) {
        return ResponseEntity.ok(orderService.findByOrderDateAndUserId(orderDate, userId));
    }

    @Operation(summary = "Получить все заказы (для админа)")
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<OrderDTO>> getAllOrders(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderDTO> orders = orderService.getAllOrders(pageable);
        return ResponseEntity.ok(orders);
    }

    @Operation(summary = "Обновить статус заказа (для админа)")
    @PutMapping("/admin/status/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long orderId, @RequestBody String status) {
        OrderDTO updatedOrder = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(updatedOrder);
    }

    @Operation(summary = "Получить отчёт по тратам пользователя")
    @GetMapping("/spending-report")
    public ResponseEntity<List<SpendingReportDTO>> getSpendingReport(
            @RequestParam Long userId,
            @RequestParam int year,
            @RequestParam int month) {
        List<SpendingReportDTO> report = orderService.getSpendingReport(userId, year, month);
        return ResponseEntity.ok(report);
    }
}