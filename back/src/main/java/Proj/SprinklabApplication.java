package Proj;

import Proj.laba.model.Role;
import Proj.laba.model.User;
import Proj.laba.reposirory.RoleRepository;
import Proj.laba.reposirory.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SprinklabApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(SprinklabApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        createAdminUser();
    }

    @PostConstruct
    public void initializeRoles() {
        // Создаем роль USER если она не существует
        if (roleRepository.findByTitle("USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setTitle("USER");
            userRole.setDescription("Default user role");
            roleRepository.save(userRole);
        }

        // Создаем роль ADMIN если она не существует
        if (roleRepository.findByTitle("ADMIN").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setTitle("ADMIN");
            adminRole.setDescription("Administrator role");
            roleRepository.save(adminRole);
        }
    }


    private void createAdminUser() {
        if (userRepository.findByLogin("admin").isEmpty()) {
            Role adminRole = roleRepository.findByTitle("ADMIN")
                    .orElseThrow(() -> new RuntimeException("Administrator role not found"));

            User admin = new User();
            admin.setLogin("admin");
            admin.setPassword(passwordEncoder.encode("Admin123!"));
            admin.setEmail("admin@example.com");
            admin.setFirstName("Admin");
            admin.setLastName("Adminov");
            admin.setRole(adminRole);

            userRepository.save(admin);
        }
    }
}
