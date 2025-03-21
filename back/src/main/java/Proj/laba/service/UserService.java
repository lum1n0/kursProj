package Proj.laba.service;



import Proj.laba.dto.SimpleRegistrationDTO;
import Proj.laba.dto.UserResponseDTO;
import Proj.laba.model.User;
import Proj.laba.model.Role;
import Proj.laba.reposirory.GenericRepository;
import Proj.laba.reposirory.RoleRepository;
import Proj.laba.reposirory.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(GenericRepository<User> repository,
                       PasswordEncoder passwordEncoder,
                       UserRepository userRepository,
                       RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        initializeRoles(); // Инициализация ролей при старте сервиса
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

    public User registerSimple(SimpleRegistrationDTO registerDTO) {
        // Проверяем, существует ли пользователь
        if (userRepository.findByLogin(registerDTO.getLogin()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        if (userRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setLogin(registerDTO.getLogin());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setEmail(registerDTO.getEmail());
        user.setFirstName("Временное имя");
        user.setLastName("Временная фамилия");

        // Устанавливаем роль USER по умолчанию
        Role userRole = roleRepository.findByTitle("USER")
                .orElseThrow(() -> new RuntimeException("User role not found")); // Изменено на "USER"
        user.setRole(userRole);

        return userRepository.save(user);
    }

    // Обновление пользователя
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFirstName(updatedUser.getFirstName());
                    user.setLastName(updatedUser.getLastName());
                    user.setEmail(updatedUser.getEmail());
                    user.setBirthDate(updatedUser.getBirthDate());
                    user.setPhone(updatedUser.getPhone());
                    user.setAddress(updatedUser.getAddress());
                    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                        user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                    }
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // Остальные базовые методы
    public List<UserResponseDTO> findByLastName(String lastName) {
        List<User> users = userRepository.findByLastName(lastName);
        return users.stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }

    public Optional<UserResponseDTO> findById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToUserResponse);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    private UserResponseDTO convertToUserResponse(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setLogin(user.getLogin());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        dto.setRole(user.getRole() != null ? user.getRole().getTitle() : null);
        return dto;
    }
    public Optional<User> findByLogin(String login) {
        return userRepository.findByLogin(login);
    }
}
