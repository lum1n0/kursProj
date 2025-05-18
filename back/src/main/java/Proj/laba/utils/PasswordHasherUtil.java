package Proj.laba.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordHasherUtil {

    public static void main(String[] args) {
        // Пароль, который нужно хешировать
        String rawPassword = "Pavel567!";

        // Создаем экземпляр кодировщика паролей (такой же, как в вашем проекте)
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Хешируем пароль
        String hashedPassword = passwordEncoder.encode(rawPassword);

        // Выводим оригинальный и хешированный пароль в консоль
        System.out.println("Original Password: " + rawPassword);
        System.out.println("Hashed Password  : " + hashedPassword);

        // Пример проверки пароля (необязательно, для демонстрации)
        // boolean isMatch = passwordEncoder.matches(rawPassword, hashedPassword);
        // System.out.println("Password matches : " + isMatch);
    }
}
