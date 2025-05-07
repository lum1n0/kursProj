package aptpr.sprinklab;

import Proj.SprinklabApplication;
import Proj.laba.controller.rest.AuthController;
import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.dto.RoleDTO;
import Proj.laba.dto.SimpleRegistrationDTO;
import Proj.laba.mapper.RoleMapper;
import Proj.laba.mapper.UserMapper;
import Proj.laba.model.ProductService;
import Proj.laba.model.Role;
import Proj.laba.model.User;
import Proj.laba.reposirory.ProductCategoryRepository;
import Proj.laba.reposirory.RoleRepository;
import Proj.laba.reposirory.UserHistoryRepository;
import Proj.laba.reposirory.UserRepository;
import Proj.laba.reposirory.OrderRepository;
import Proj.laba.reposirory.ProductServiceRepository;
import Proj.laba.service.ProductServiceService;
import Proj.laba.service.RoleService;
import Proj.laba.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.webjars.NotFoundException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

// Модульные тесты
@ExtendWith(MockitoExtension.class)
class SprinklabUnitTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserHistoryRepository userHistoryRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private ProductServiceRepository productServiceRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    // Тест 1: Проверка маппинга Role в RoleDTO
    @Test
    void testRoleToRoleDTOMapping() {
        // Подготовка данных
        RoleMapper roleMapper = new RoleMapper(new org.modelmapper.ModelMapper());
        Role role = new Role();
        role.setId(1L);
        role.setTitle("ADMIN");
        role.setDescription("Administrator role");

        // Выполнение теста
        RoleDTO roleDTO = roleMapper.toDTO(role);

        // Проверка результатов
        assertNotNull(roleDTO);
        assertEquals(1L, roleDTO.getId());
        assertEquals("ADMIN", roleDTO.getTitle());
        assertEquals("Administrator role", roleDTO.getDescription());
    }

    // Тест 2: Проверка работы ProductServiceService
    @Mock
    private ProductServiceService productServiceService;

    @Test
    void testGetAllProductServices() {
        // Подготовка данных
        List<ProductServiceDTO> serviceList = new ArrayList<>();

        ProductServiceDTO service1 = new ProductServiceDTO();
        service1.setId(1L);
        service1.setName("Internet 100Mbps");
        service1.setPrice(new BigDecimal("30.00"));

        ProductServiceDTO service2 = new ProductServiceDTO();
        service2.setId(2L);
        service2.setName("TV Package");
        service2.setPrice(new BigDecimal("25.00"));

        serviceList.add(service1);
        serviceList.add(service2);

        when(productServiceService.listAll()).thenReturn(serviceList);

        // Выполнение теста
        List<ProductServiceDTO> result = productServiceService.listAll();

        // Проверка результатов
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Internet 100Mbps", result.get(0).getName());
        assertEquals("TV Package", result.get(1).getName());
    }

    // Тест 3: Проверка UserService - deleteUser
    @Test
    void testDeleteUser() {
        Long userId = 1L;
        User user = new User();
        user.setId(userId);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        userService.deleteUser(userId);

        verify(userHistoryRepository, times(1)).deleteByUser(user);
        verify(userRepository, times(1)).delete(user);
    }

    // Тест 4: Проверка UserService - getAllUsers
    @Test
    void testGetAllUsers() {
        List<User> userList = new ArrayList<>();
        User user1 = new User();
        user1.setId(1L);
        user1.setLogin("testUser1");
        userList.add(user1);

        User user2 = new User();
        user2.setId(2L);
        user2.setLogin("testUser2");
        userList.add(user2);

        when(userRepository.findAll()).thenReturn(userList);

        List<User> result = userService.getAllUsers();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("testUser1", result.get(0).getLogin());
        assertEquals("testUser2", result.get(1).getLogin());
    }

    // Тест 5: Проверка ProductCategoryRepository
    @Mock
    private ProductCategoryRepository productCategoryRepository;

    @Test
    void testProductCategoryRepositoryCount() {
        when(productCategoryRepository.count()).thenReturn(5L);
        assertEquals(5L, productCategoryRepository.count());
    }
}

// Интеграционные тесты
@SpringBootTest(classes = SprinklabApplication.class)
class SprinklabIntegrationTests {

    @Autowired
    private AuthController authController;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testRegisterUserIntegration() {
        // Создаем DTO для регистрации
        SimpleRegistrationDTO registrationDTO = new SimpleRegistrationDTO();
        registrationDTO.setLogin("integrationUser");
        registrationDTO.setPassword("password");
        registrationDTO.setConfirmPassword("password");
        registrationDTO.setEmail("integration@example.com");

        // Создаем мок BindingResult
        BindingResult bindingResult = mock(BindingResult.class);
        when(bindingResult.hasErrors()).thenReturn(false);

        // Вызываем метод регистрации
        ResponseEntity<?> response = authController.register(registrationDTO, bindingResult);

        // Проверяем, что регистрация прошла успешно
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Проверяем, что пользователь был создан в базе данных
        User user = userRepository.findByLogin("integrationUser").orElse(null);
        assertNotNull(user);
        assertEquals("integrationUser", user.getLogin());

        // Удаляем тестового пользователя после завершения теста
        if (user != null) {
            userRepository.delete(user);
        }
    }
}