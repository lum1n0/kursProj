package Proj.laba.service;

import Proj.laba.dto.SimpleRegistrationDTO;
import Proj.laba.dto.UserResponseDTO;
import Proj.laba.mapper.UserMapper;
import Proj.laba.model.User;
import Proj.laba.model.Role;
import Proj.laba.model.Tariff;
import Proj.laba.model.UserHistory;
import Proj.laba.reposirory.RoleRepository;
import Proj.laba.reposirory.TariffRepository;
import Proj.laba.reposirory.UserHistoryRepository;
import Proj.laba.reposirory.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService extends GenericService<User, UserResponseDTO> {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TariffRepository tariffRepository;
    private final UserHistoryRepository userHistoryRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository,
                       TariffRepository tariffRepository,
                       UserHistoryRepository userHistoryRepository) {
        super(userRepository, userMapper);
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.tariffRepository = tariffRepository;
        this.userHistoryRepository = userHistoryRepository;
        initializeRoles(); // Инициализация ролей при старте сервиса
    }

    @PostConstruct
    public void initializeRoles() {
        // Создаем роль USER, если она не существует
        if (roleRepository.findByTitle("USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setTitle("USER");
            userRole.setDescription("Default user role");
            roleRepository.save(userRole);
        }

        // Создаем роль ADMIN, если она не существует
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
                .orElseThrow(() -> new RuntimeException("User role not found"));
        user.setRole(userRole);

        return userRepository.save(user);
    }

    @Override
@Transactional
public UserResponseDTO update(UserResponseDTO updatedObject) {
    // Находим существующего пользователя
    User existingUser = userRepository.findById(updatedObject.getId())
            .orElseThrow(() -> new NotFoundException("User с ID " + updatedObject.getId() + " не найден"));

    // Сохраняем оригинальные данные для истории изменений
    User originalUser = new User();
    originalUser.setFirstName(existingUser.getFirstName());
    originalUser.setLastName(existingUser.getLastName());
    originalUser.setEmail(existingUser.getEmail());
    originalUser.setPhone(existingUser.getPhone());
    originalUser.setRole(existingUser.getRole());
    originalUser.setTariff(existingUser.getTariff());
    originalUser.setPassword(existingUser.getPassword());

    // Обновляем только те поля, которые переданы и не равны null
    if (updatedObject.getFirstName() != null) {
        existingUser.setFirstName(updatedObject.getFirstName());
    }
    if (updatedObject.getLastName() != null) {
        existingUser.setLastName(updatedObject.getLastName());
    }
    if (updatedObject.getEmail() != null) {
        existingUser.setEmail(updatedObject.getEmail());
    }
    if (updatedObject.getPhone() != null) {
        existingUser.setPhone(updatedObject.getPhone());
    }

    // Обновляем роль, если она передана и отличается от текущей
    if (updatedObject.getRole() != null && !updatedObject.getRole().equals(existingUser.getRole().getTitle())) {
        Role role = roleRepository.findByTitle(updatedObject.getRole())
                .orElseThrow(() -> new NotFoundException("Role " + updatedObject.getRole() + " not found"));
        existingUser.setRole(role);
    }

    // Обновляем тариф, если он передан и отличается от текущего
    if (updatedObject.getTariffId() != null && (existingUser.getTariff() == null || !updatedObject.getTariffId().equals(existingUser.getTariff().getId()))) {
        Tariff tariff = tariffRepository.findById(updatedObject.getTariffId())
                .orElseThrow(() -> new NotFoundException("Tariff with ID " + updatedObject.getTariffId() + " not found"));
        existingUser.setTariff(tariff);
    }

    // Сохраняем историю изменений, сравнивая оригинальные и новые данные
    saveHistory(originalUser, existingUser, "admin"); // Замени "admin" на текущего пользователя, если нужно

    // Сохраняем обновленного пользователя и возвращаем DTO
    return userMapper.toDTO(userRepository.save(existingUser));
}
    
     
private void saveHistory(User oldUser, User newUser, String changedBy) {
    if (!oldUser.getFirstName().equals(newUser.getFirstName())) {
        userHistoryRepository.save(new UserHistory(null, newUser, "firstName", oldUser.getFirstName(), newUser.getFirstName(), changedBy, LocalDateTime.now()));
    }
    if (!oldUser.getLastName().equals(newUser.getLastName())) {
        userHistoryRepository.save(new UserHistory(null, newUser, "lastName", oldUser.getLastName(), newUser.getLastName(), changedBy, LocalDateTime.now()));
    }
    if (oldUser.getEmail() != null && !oldUser.getEmail().equals(newUser.getEmail())) {
        userHistoryRepository.save(new UserHistory(null, newUser, "email", oldUser.getEmail(), newUser.getEmail(), changedBy, LocalDateTime.now()));
    }
    if (oldUser.getPhone() != null && !oldUser.getPhone().equals(newUser.getPhone())) {
        userHistoryRepository.save(new UserHistory(null, newUser, "phone", oldUser.getPhone(), newUser.getPhone(), changedBy, LocalDateTime.now()));
    }
    if (oldUser.getRole() != null && newUser.getRole() != null && !oldUser.getRole().getTitle().equals(newUser.getRole().getTitle())) {
        userHistoryRepository.save(new UserHistory(null, newUser, "role", oldUser.getRole().getTitle(), newUser.getRole().getTitle(), changedBy, LocalDateTime.now()));
    }
    if (oldUser.getTariff() != null && newUser.getTariff() != null && !oldUser.getTariff().getId().equals(newUser.getTariff().getId())) {
        userHistoryRepository.save(new UserHistory(null, newUser, "tariff", oldUser.getTariff().getId().toString(), newUser.getTariff().getId().toString(), changedBy, LocalDateTime.now()));
    }
}

    public Page<UserResponseDTO> listAllPaged(Pageable pageable) {
        return userRepository.findAll(pageable).map(userMapper::toDTO);
    }

    public List<UserResponseDTO> findByLastName(String lastName) {
        List<User> users = userRepository.findByLastName(lastName);
        return users.stream().map(userMapper::toDTO).collect(Collectors.toList());
    }

    public Optional<UserResponseDTO> findById(Long id) {
        return userRepository.findById(id).map(userMapper::toDTO);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByLogin(String login) {
        return userRepository.findByLogin(login);
    }
}