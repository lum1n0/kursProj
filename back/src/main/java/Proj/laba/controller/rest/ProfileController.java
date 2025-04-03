package Proj.laba.controller.rest;

import Proj.laba.dto.UserResponseDTO;
import Proj.laba.dto.UserUpdateDTO;
import Proj.laba.model.User;
import Proj.laba.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    // Добавленный метод для GET-запроса
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByLogin(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserResponseDTO userDTO = new UserResponseDTO();
        userDTO.setId(user.getId());
        userDTO.setLogin(user.getLogin());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setPhone(user.getPhone());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/me")
public ResponseEntity<?> updateCurrentUser(
        @RequestBody UserUpdateDTO updateDTO,
        Authentication authentication) {
    try {
        String username = authentication.getName();
        User user = userService.findByLogin(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Преобразуем User в UserResponseDTO
        UserResponseDTO userDTO = new UserResponseDTO();
        userDTO.setId(user.getId());
        userDTO.setLogin(user.getLogin());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(updateDTO.getFirstName());
        userDTO.setLastName(updateDTO.getLastName());
        userDTO.setPhone(updateDTO.getPhone());
        userDTO.setRole(user.getRole().getTitle());
        

        // Обновляем через сервис
        UserResponseDTO updatedUser = userService.update(userDTO);
        return ResponseEntity.ok(updatedUser);
    } catch (DataIntegrityViolationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Телефон уже используется другим пользователем");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Ошибка при обновлении профиля: " + e.getMessage());
    }
}
}