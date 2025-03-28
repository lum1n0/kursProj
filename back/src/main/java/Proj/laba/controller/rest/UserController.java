package Proj.laba.controller.rest;

import Proj.laba.dto.UserResponseDTO;
import Proj.laba.model.User;
import Proj.laba.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import java.util.List;

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

    @Operation(summary = "Поиск пользователей по фамилии")
    @GetMapping("/by-lastname/{lastName}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponseDTO>> getUsersByLastName(@PathVariable String lastName) {
        List<UserResponseDTO> users = userService.findByLastName(lastName);
        return ResponseEntity.ok(users);
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
        userDTO.setId(id); // Устанавливаем ID из пути
        UserResponseDTO updatedUser = userService.update(userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @Operation(summary = "Удалить пользователя")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/paged")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Page<UserResponseDTO>> getAllUsersPaged(@PageableDefault(size = 10) Pageable pageable) {
    return ResponseEntity.ok(userService.listAllPaged(pageable));
}

    
}