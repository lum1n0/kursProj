package Proj.laba.controller.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private final ResourceLoader resourceLoader;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public UploadController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @PostMapping
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Проверка, что файл не пустой
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Пожалуйста, выберите файл для загрузки");
            }

            // Создаем уникальное имя для файла
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = UUID.randomUUID().toString() + fileExtension;

            // Получаем путь к директории для загрузки
            Path uploadPath;
            try {
                Resource resource = resourceLoader.getResource("classpath:" + uploadDir);
                uploadPath = Paths.get(resource.getURI());
            } catch (Exception e) {
                // Если директория не существует в classpath, создаем ее в файловой системе
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }
                uploadPath = Paths.get(directory.getAbsolutePath());
            }

            // Создаем полный путь для файла
            Path filePath = uploadPath.resolve(newFilename);
            
            // Копируем файл в целевую директорию
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Возвращаем путь к загруженному файлу
            return ResponseEntity.ok("/uploads/" + newFilename);
            
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Не удалось загрузить файл: " + e.getMessage());
        }
    }
}