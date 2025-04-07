package Proj.laba.controller.rest;

import Proj.laba.dto.UserResponseDTO;
import Proj.laba.dto.UserUpdateDTO;
import Proj.laba.model.User;
import Proj.laba.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.hibernate.Hibernate;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    @Transactional
    public ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {
        try {
            String username = authentication.getName();
            log.info("Получен запрос профиля для пользователя: {}", username);
            User user = userService.findByLogin(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Явно инициализируем tariff
            Hibernate.initialize(user.getTariff());

            // Ручное заполнение UserResponseDTO
            UserResponseDTO userDTO = new UserResponseDTO();
            userDTO.setId(user.getId());
            userDTO.setLogin(user.getLogin());
            userDTO.setFirstName(user.getFirstName());
            userDTO.setLastName(user.getLastName());
            userDTO.setEmail(user.getEmail());
            userDTO.setPhone(user.getPhone());
            userDTO.setAddress(user.getAddress());
            userDTO.setRole(user.getRole().getTitle());
            userDTO.setTariffName(userService.getTariffName(user));

            log.info("Профиль успешно преобразован для пользователя: {}", username);
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            log.error("Ошибка при получении профиля пользователя {}: {}", authentication.getName(), e.getMessage(), e);
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/me")
    @Transactional
    public ResponseEntity<?> updateCurrentUser(
            @RequestBody UserUpdateDTO updateDTO,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            log.info("Запрос на обновление профиля для пользователя: {}", username);
            User user = userService.findByLogin(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Обновляем поля пользователя
            if (updateDTO.getFirstName() != null) {
                user.setFirstName(updateDTO.getFirstName());
            }
            if (updateDTO.getLastName() != null) {
                user.setLastName(updateDTO.getLastName());
            }
            if (updateDTO.getPhone() != null) {
                user.setPhone(updateDTO.getPhone());
            }

            // Сохраняем обновленного пользователя
            userService.update(userService.getMapper().toDTO(user));

            // Возвращаем обновленные данные пользователя
            UserResponseDTO updatedUserDTO = userService.getMapper().toDTO(user);
            log.info("Профиль успешно обновлен для пользователя: {}", username);
            return ResponseEntity.ok(updatedUserDTO);
        } catch (DataIntegrityViolationException e) {
            log.warn("Конфликт при обновлении профиля пользователя {}: телефон уже используется", authentication.getName());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Телефон уже используется другим пользователем");
        } catch (Exception e) {
            log.error("Ошибка при обновлении профиля пользователя {}: {}", authentication.getName(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при обновлении профиля: " + e.getMessage());
        }
    }
}