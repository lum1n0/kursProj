package Proj.laba.controller.rest;

import Proj.laba.dto.UserResponseDTO;
import Proj.laba.model.User;
import Proj.laba.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {
        String username = authentication.getName(); // Логин текущего пользователя
        User user = userService.findByLogin(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserResponseDTO userDTO = new UserResponseDTO(); // Предполагается, что у тебя есть такой DTO
        userDTO.setId(user.getId());
        userDTO.setLogin(user.getLogin());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setPhone(user.getPhone());
        return ResponseEntity.ok(userDTO);
    }
}