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
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableScheduling
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
        createMasterUser();
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

        // Создаем роль MASTER если она не существует
        if (roleRepository.findByTitle("MASTER").isEmpty()) {
            Role masterRole = new Role();
            masterRole.setTitle("MASTER");
            masterRole.setDescription("Master role for handling requests");
            roleRepository.save(masterRole);
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
            admin.setPhone("1234567890");
            admin.setRole(adminRole);

            userRepository.save(admin);
        }
    }

    private void createMasterUser() {
        if (userRepository.findByLogin("master").isEmpty()) {
            Role masterRole = roleRepository.findByTitle("MASTER")
                    .orElseThrow(() -> new RuntimeException("Master role not found"));

            User master = new User();
            master.setLogin("master");
            master.setPassword(passwordEncoder.encode("Master123!"));
            master.setEmail("master@example.com");
            master.setFirstName("Master");
            master.setLastName("Masterov");
            master.setPhone("0987654321");
            master.setRole(masterRole);

            userRepository.save(master);
        }
    }
}