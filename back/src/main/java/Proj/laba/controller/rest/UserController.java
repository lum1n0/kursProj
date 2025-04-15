package Proj.laba.controller.rest;

import Proj.laba.dto.UserResponseDTO;
import Proj.laba.model.User;
import Proj.laba.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "API для работы с пользователями")
@SecurityRequirement(name = "JWT")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Поиск пользователя по ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Получить всех пользователей")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @Operation(summary = "Обновить пользователя")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id, @RequestBody UserResponseDTO userDTO) {
        userDTO.setId(id);
        UserResponseDTO updatedUser = userService.update(userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @Operation(summary = "Обновить тариф пользователя")
    @PutMapping("/{id}/tariff")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> updateTariff(@PathVariable Long id, @RequestParam Long tariffId) {
        userService.updateTariff(id, tariffId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Удалить пользователя")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Получить всех пользователей с пагинацией")
    @GetMapping("/paged")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<UserResponseDTO>> getAllUsersPaged(@PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(userService.listAllPaged(pageable));
    }

    @Operation(summary = "Пополнить баланс пользователя")
    @PostMapping("/topup")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> topUpBalance(@RequestBody Map<String, BigDecimal> requestBody, Authentication authentication) {
        BigDecimal amount = requestBody.get("amount");
        if (amount == null) {
            return ResponseEntity.badRequest().body("Параметр 'amount' обязателен");
        }
        String username = authentication.getName();
        User user = userService.findByLogin(username).orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        Long userId = user.getId();
        try {
            userService.topUpBalance(userId, amount);
            return ResponseEntity.ok("Баланс успешно пополнен");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Ошибка при пополнении баланса: " + e.getMessage());
        }
    }
}