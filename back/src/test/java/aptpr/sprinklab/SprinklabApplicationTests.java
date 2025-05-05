package aptpr.sprinklab;

import Proj.SprinklabApplication;
import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.dto.RoleDTO;
import Proj.laba.dto.UserResponseDTO;
import Proj.laba.mapper.ProductServiceMapper;
import Proj.laba.mapper.RoleMapper;
import Proj.laba.model.ProductCategory;
import Proj.laba.model.ProductService;
import Proj.laba.model.Role;
import Proj.laba.model.User;
import Proj.laba.reposirory.ProductCategoryRepository;
import Proj.laba.reposirory.RoleRepository;
import Proj.laba.reposirory.UserRepository;
import Proj.laba.service.ProductServiceService;
import Proj.laba.service.RoleService;
import Proj.laba.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

// Модульные тесты
@ExtendWith(MockitoExtension.class)
class SprinklabUnitTests {

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

    // Тест 2: Проверка работы RoleService
    @Mock
    private RoleRepository roleRepository;

    @Mock
    private RoleMapper roleMapper;

    @InjectMocks
    private RoleService roleService;

    @Test
    void testGetRoleById() {
        // Подготовка данных
        Role role = new Role();
        role.setId(1L);
        role.setTitle("USER");

        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(1L);
        roleDTO.setTitle("USER");

        when(roleRepository.findById(1L)).thenReturn(Optional.of(role));
        when(roleMapper.toDTO(role)).thenReturn(roleDTO);

        // Выполнение теста
        RoleDTO result = roleService.getOne(1L);

        // Проверка результатов
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("USER", result.getTitle());
    }

    // Тест 3: Проверка маппинга ProductService в ProductServiceDTO
    @Mock
    private ProductCategoryRepository productCategoryRepository;

  
    // Тест 4: Проверка работы ProductServiceService
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

    // Тест 5: Проверка работы UserService
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserService userService;



// Интеграционный тест
@SpringBootTest(classes = SprinklabApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class SprinklabApplicationTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RoleRepository roleRepository;

    @Test
    void testProductCategoryEndpoint() {
        // Выполнение теста - запрос к API
        ResponseEntity<Object[]> response = restTemplate.getForEntity("/product-categories", Object[].class);

        // Проверка результатов
        assertEquals(HttpStatus.OK, response.getStatusCode());
        // В случае реальных данных здесь можно проверить размер массива и другие свойства
    }
}
}
