package Proj.laba.service;

import Proj.laba.dto.OrderDTO;
import Proj.laba.mapper.OrderMapper;
import Proj.laba.model.Order;
import Proj.laba.model.ProductService;
import Proj.laba.model.User;
import Proj.laba.reposirory.GenericRepository;
import Proj.laba.reposirory.OrderRepository;
import Proj.laba.reposirory.ProductServiceRepository;
import Proj.laba.reposirory.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;
import java.lang.Math;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class OrderService extends GenericService<Order, OrderDTO> {

    private final UserRepository userRepository;
    private final ProductServiceRepository productServiceRepository;

    public OrderService(GenericRepository<Order> repository,
                        OrderMapper mapper,
                        UserRepository userRepository,
                        ProductServiceRepository productServiceRepository) {
        super(repository, mapper);
        this.userRepository = userRepository;
        this.productServiceRepository = productServiceRepository;
    }

    @Override
    @Transactional
    public OrderDTO create(OrderDTO newObject) {
        // Находим связанные сущности
        User user = userRepository.findById(newObject.getUserId())
                .orElseThrow(() -> new NotFoundException(
                        "User с ID " + newObject.getUserId() + " не найден"));

        ProductService productService = productServiceRepository.findById(newObject.getProductServiceId())
                .orElseThrow(() -> new NotFoundException(
                        "ProductService с ID " + newObject.getProductServiceId() + " не найден"));

        // Создаем сущность через маппер
        Order order = mapper.toEntity(newObject);

        // Устанавливаем связи
        order.setUser(user);
        order.setProductService(productService);

        // Устанавливаем финальную цену и дату
        order.setFinalPrice(productService.getPrice().multiply(new BigDecimal(newObject.getQuantity())));
        order.setOrderDate(LocalDateTime.now());

        // Сохраняем и возвращаем результат
        Order savedOrder = repository.save(order);
        return mapper.toDTO(savedOrder);
    }

    @Override
    @Transactional
    public OrderDTO update(OrderDTO updatedObject) {
        // Проверяем существование заказа
        Order existingOrder = repository.findById(updatedObject.getId())
                .orElseThrow(() -> new NotFoundException(
                        "Order с ID " + updatedObject.getId() + " не найден"));

        // Проверяем существование связанных сущностей
        User user = userRepository.findById(updatedObject.getUserId())
                .orElseThrow(() -> new NotFoundException(
                        "User с ID " + updatedObject.getUserId() + " не найден"));

        ProductService productService = productServiceRepository.findById(updatedObject.getProductServiceId())
                .orElseThrow(() -> new NotFoundException(
                        "ProductService с ID " + updatedObject.getProductServiceId() + " не найден"));

        // Пересчитываем финальную цену
updatedObject.setFinalPrice(productService.getPrice().multiply(new BigDecimal(updatedObject.getQuantity())));

        Order orderToUpdate = mapper.toEntity(updatedObject);

        // Устанавливаем связи
        orderToUpdate.setProductService(productService);
        orderToUpdate.setUser(user);

        // Сохраняем и возвращаем обновленный результат
        Order updatedOrder = repository.save(orderToUpdate);
        return mapper.toDTO(updatedOrder);


    }

    @Override
    @Transactional
    public void delete(final Long id) {
        // Проверяем существование записи перед удалением
        repository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Order с ID " + id + " не найден"));
        repository.deleteById(id);
    }

    // Дополнительные методы, если необходимо
    @Transactional(readOnly = true)
    public OrderDTO findByOrderDateAndUserId(LocalDateTime orderDate, Long userId) {
        return mapper.toDTO(((OrderRepository) repository)
                .findByOrderDateAndUserId(orderDate, userId)
                .orElseThrow(() -> new NotFoundException("Заказ не найден")));
    }



}
