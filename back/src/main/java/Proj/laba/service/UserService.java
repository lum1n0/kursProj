package Proj.laba.service;

import Proj.laba.dto.SimpleRegistrationDTO;
import Proj.laba.dto.UserResponseDTO;
import Proj.laba.mapper.UserMapper;
import Proj.laba.model.User;
import Proj.laba.model.Role;
import Proj.laba.model.UserHistory;
import Proj.laba.model.Order;
import Proj.laba.model.ProductService;
import Proj.laba.reposirory.RoleRepository;
import Proj.laba.reposirory.UserHistoryRepository;
import Proj.laba.reposirory.UserRepository;
import Proj.laba.reposirory.OrderRepository;
import Proj.laba.reposirory.ProductServiceRepository;
import org.hibernate.Hibernate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService extends GenericService<User, UserResponseDTO> {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserHistoryRepository userHistoryRepository;
    private final UserMapper userMapper;
    private final OrderRepository orderRepository;
    private final ProductServiceRepository productServiceRepository;

    public UserService(UserRepository userRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository,
                       UserHistoryRepository userHistoryRepository,
                       OrderRepository orderRepository,
                       ProductServiceRepository productServiceRepository) {
        super(userRepository, userMapper);
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userHistoryRepository = userHistoryRepository;
        this.orderRepository = orderRepository;
        this.productServiceRepository = productServiceRepository;
        initializeRoles();
    }

    @PostConstruct
    public void initializeRoles() {
        if (roleRepository.findByTitle("USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setTitle("USER");
            userRole.setDescription("Default user role");
            roleRepository.save(userRole);
        }
        if (roleRepository.findByTitle("ADMIN").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setTitle("ADMIN");
            adminRole.setDescription("Administrator role");
            roleRepository.save(adminRole);
        }
    }

    public User registerSimple(SimpleRegistrationDTO registerDTO) {
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

        Role userRole = roleRepository.findByTitle("USER")
                .orElseThrow(() -> new RuntimeException("User role not found"));
        user.setRole(userRole);

        log.info("Сохраняем пользователя без тарифа: {}", user);

        user = userRepository.save(user);

        log.info("Пользователь сохранен: {}", user);

        ProductService initialTariff = productServiceRepository.findById(3L)
                .orElseThrow(() -> new NotFoundException("Initial tariff with id=3 not found"));

        user.setTariff(initialTariff);

        log.info("Установлен тариф для пользователя: {}", initialTariff);

        userRepository.save(user);

        log.info("Пользователь с тарифом сохранен: {}", user);

        Order order = new Order();
        order.setUser(user);
        order.setProductService(initialTariff);
        order.setQuantity(1);
        order.setFinalPrice(initialTariff.getPrice());
        order.setOrderDate(LocalDateTime.now());

        orderRepository.save(order);

        log.info("Заказ создан: {}", order);

        return user;
    }

    @Transactional
    public void updateTariff(Long userId, Long newTariffId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User с ID " + userId + " не найден"));

        ProductService newTariff = productServiceRepository.findById(newTariffId)
                .orElseThrow(() -> new NotFoundException("Tariff с ID " + newTariffId + " не найден"));

        Order order = new Order();
        order.setUser(user);
        order.setProductService(newTariff);
        order.setQuantity(1);
        order.setFinalPrice(newTariff.getPrice());
        order.setOrderDate(LocalDateTime.now());

        orderRepository.save(order);

        user.setTariff(newTariff);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public UserResponseDTO update(UserResponseDTO updatedObject) {
        log.info("Обновление пользователя с id={}", updatedObject.getId());
        User existingUser = userRepository.findById(updatedObject.getId())
                .orElseThrow(() -> new NotFoundException("User с ID " + updatedObject.getId() + " не найден"));

        // Сохраняем копию текущего состояния пользователя для сравнения
        User originalUser = new User();
        originalUser.setId(existingUser.getId());
        originalUser.setFirstName(existingUser.getFirstName());
        originalUser.setLastName(existingUser.getLastName());
        originalUser.setEmail(existingUser.getEmail());
        originalUser.setPhone(existingUser.getPhone());
        originalUser.setRole(existingUser.getRole());
        originalUser.setPassword(existingUser.getPassword());

        // Обновляем поля, если они переданы
        if (updatedObject.getFirstName() != null && !updatedObject.getFirstName().equals(existingUser.getFirstName())) {
            log.info("Обновление firstName: {} -> {}", existingUser.getFirstName(), updatedObject.getFirstName());
            existingUser.setFirstName(updatedObject.getFirstName());
        }
        if (updatedObject.getLastName() != null && !updatedObject.getLastName().equals(existingUser.getLastName())) {
            log.info("Обновление lastName: {} -> {}", existingUser.getLastName(), updatedObject.getLastName());
            existingUser.setLastName(updatedObject.getLastName());
        }
        if (updatedObject.getEmail() != null && !updatedObject.getEmail().equals(existingUser.getEmail())) {
            log.info("Обновление email: {} -> {}", existingUser.getEmail(), updatedObject.getEmail());
            existingUser.setEmail(updatedObject.getEmail());
        }
        if (updatedObject.getPhone() != null && !updatedObject.getPhone().equals(existingUser.getPhone())) {
            log.info("Обновление phone: {} -> {}", existingUser.getPhone(), updatedObject.getPhone());
            existingUser.setPhone(updatedObject.getPhone());
        }
        if (updatedObject.getRole() != null && !updatedObject.getRole().equals(existingUser.getRole().getTitle())) {
            Role role = roleRepository.findByTitle(updatedObject.getRole())
                    .orElseThrow(() -> new NotFoundException("Role " + updatedObject.getRole() + " not found"));
            log.info("Обновление role: {} -> {}", existingUser.getRole().getTitle(), role.getTitle());
            existingUser.setRole(role);
        }

        // Сохраняем историю изменений
        saveHistory(originalUser, existingUser, "admin");

        // Сохраняем обновленного пользователя
        User savedUser = userRepository.save(existingUser);
        log.info("Пользователь обновлен: id={}", savedUser.getId());
        return userMapper.toDTO(savedUser);
    }

    private void saveHistory(User oldUser, User newUser, String changedBy) {
        log.info("Проверка изменений для userId={}", newUser.getId());
        if (oldUser.getFirstName() != null && !oldUser.getFirstName().equals(newUser.getFirstName())) {
            UserHistory history = new UserHistory(null, newUser, "firstName", oldUser.getFirstName(), newUser.getFirstName(), changedBy, LocalDateTime.now());
            userHistoryRepository.save(history);
            log.info("Сохранена история для userId={}, field={}, oldValue={}, newValue={}", newUser.getId(), history.getFieldName(), history.getOldValue(), history.getNewValue());
        }
        if (oldUser.getLastName() != null && !oldUser.getLastName().equals(newUser.getLastName())) {
            UserHistory history = new UserHistory(null, newUser, "lastName", oldUser.getLastName(), newUser.getLastName(), changedBy, LocalDateTime.now());
            userHistoryRepository.save(history);
            log.info("Сохранена история для userId={}, field={}, oldValue={}, newValue={}", newUser.getId(), history.getFieldName(), history.getOldValue(), history.getNewValue());
        }
        if (oldUser.getEmail() != null && !oldUser.getEmail().equals(newUser.getEmail())) {
            UserHistory history = new UserHistory(null, newUser, "email", oldUser.getEmail(), newUser.getEmail(), changedBy, LocalDateTime.now());
            userHistoryRepository.save(history);
            log.info("Сохранена история для userId={}, field={}, oldValue={}, newValue={}", newUser.getId(), history.getFieldName(), history.getOldValue(), history.getNewValue());
        }
        if (oldUser.getPhone() != null && !oldUser.getPhone().equals(newUser.getPhone())) {
            UserHistory history = new UserHistory(null, newUser, "phone", oldUser.getPhone(), newUser.getPhone(), changedBy, LocalDateTime.now());
            userHistoryRepository.save(history);
            log.info("Сохранена история для userId={}, field={}, oldValue={}, newValue={}", newUser.getId(), history.getFieldName(), history.getOldValue(), history.getNewValue());
        }
        if (oldUser.getRole() != null && newUser.getRole() != null && !oldUser.getRole().getTitle().equals(newUser.getRole().getTitle())) {
            UserHistory history = new UserHistory(null, newUser, "role", oldUser.getRole().getTitle(), newUser.getRole().getTitle(), changedBy, LocalDateTime.now());
            userHistoryRepository.save(history);
            log.info("Сохранена история для userId={}, field={}, oldValue={}, newValue={}", newUser.getId(), history.getFieldName(), history.getOldValue(), history.getNewValue());
        }
    }

    public Page<UserResponseDTO> listAllPaged(Pageable pageable) {
        log.info("Получение пользователей с пагинацией: page={}, size={}", pageable.getPageNumber(), pageable.getPageSize());
        Page<User> users = userRepository.findAll(pageable);
        users.forEach(user -> {
            Hibernate.initialize(user.getRole());
            Hibernate.initialize(user.getTariff());
            log.debug("Пользователь: id={}, login={}, role={}, tariff={}",
                    user.getId(), user.getLogin(),
                    user.getRole() != null ? user.getRole().getTitle() : "Нет роли",
                    user.getTariff() != null ? user.getTariff().getName() : "Нет тарифа");
        });
        Page<UserResponseDTO> result = users.map(user -> {
            log.debug("Маппинг пользователя: id={}, login={}", user.getId(), user.getLogin());
            UserResponseDTO dto = userMapper.toDTO(user);
            log.debug("Смапленный DTO: id={}, login={}, role={}, tariffName={}",
                    dto.getId(), dto.getLogin(), dto.getRole(), dto.getTariffName());
            return dto;
        });
        log.info("Возвращено {} пользователей из {}", result.getNumberOfElements(), result.getTotalElements());
        return result;
    }

    public List<UserResponseDTO> findByLastName(String lastName) {
        List<User> users = userRepository.findByLastName(lastName);
        return users.stream().map(userMapper::toDTO).collect(Collectors.toList());
    }

    public Optional<UserResponseDTO> findById(Long id) {
        return userRepository.findById(id).map(userMapper::toDTO);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));

        userHistoryRepository.deleteByUser(user);
        userRepository.delete(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    public String getTariffName(User user) {
        ProductService tariff = user.getTariff();
        if (tariff != null) {
            return tariff.getName();
        }
        return "Нет тарифа";
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
    }

    public void topUpBalance(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Пользователь не найден"));
        user.setBalance(user.getBalance().add(amount));
        userRepository.save(user);
    }
}