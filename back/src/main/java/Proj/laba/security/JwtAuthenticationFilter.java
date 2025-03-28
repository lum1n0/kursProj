package Proj.laba.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.http.Cookie;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService; // Используем конкретную реализацию

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            System.out.println("Извлеченный токен: " + jwt);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                System.out.println("Токен валиден");
                String username = jwtUtils.getUserNameFromJwtToken(jwt);
                System.out.println("Имя пользователя из токена: " + username);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                System.out.println("UserDetails загружен: " + userDetails.getUsername() + ", роли: " + userDetails.getAuthorities());
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("Аутентификация установлена");
            } else {
                System.out.println("Токен невалиден или отсутствует");
            }
        } catch (Exception e) {
            System.out.println("Ошибка при аутентификации: " + e.getMessage());
            logger.error("Cannot set user authentication: {}", e);
        }
        filterChain.doFilter(request, response);
    }


    private String parseJwt(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        System.out.println(cookies + "1");
        if (cookies != null) {
            System.out.println(cookies + "2");
            for (Cookie cookie : cookies) {
                if ("jwtToken".equals(cookie.getName())) {
                    System.out.println("Токен из куки: " + cookie.getValue());
                    return cookie.getValue();
                }
            }
        }
        System.out.println(cookies + "4");
        return null;
    }
}
