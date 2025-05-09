package Proj.laba.controller.rest;

import Proj.laba.dto.JwtResponse;
import Proj.laba.dto.LoginRequest;
import Proj.laba.dto.SimpleRegistrationDTO;
import Proj.laba.model.User;
import Proj.laba.security.JwtUtils;
import Proj.laba.security.UserDetailsImpl;
import Proj.laba.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SimpleRegistrationDTO registrationDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        if (!registrationDTO.getPassword().equals(registrationDTO.getConfirmPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Passwords don't match!");
        }

        try {
            User registeredUser = userService.registerSimple(registrationDTO);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getLogin(),
                            loginRequest.getPassword()
                    )
            );
    
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long roleId = userDetails.getRoleId(); // Получаем ID роли

            // Создание cookie
            ResponseCookie cookie = ResponseCookie.from("jwtToken", jwt)
                    .httpOnly(true) // Доступно для JavaScript
                    .secure(false) // Для localhost (в продакшене true)
                    .path("/") // Доступно для всего приложения
                    .maxAge(10 * 60) // 10 минут
                    .sameSite("Lax") // Для локальной разработки
                    .build();
    
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(new JwtResponse(
                            jwt,
                            userDetails.getId(),
                            userDetails.getUsername(),
                            userDetails.getRole(),
                            roleId
                    ));
        } catch (AuthenticationException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Error: Invalid username or password");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal())) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            return ResponseEntity.ok(new JwtResponse(
                    null, // Токен не возвращаем, он уже в куках
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getRole(),
                    userDetails.getRoleId()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
    }
}