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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService extends GenericService<Order, OrderDTO> {

    private final UserRepository userRepository;
    private final ProductServiceRepository productServiceRepository;
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public OrderService(GenericRepository<Order> repository,
                        OrderMapper orderMapper,
                        UserRepository userRepository,
                        ProductServiceRepository productServiceRepository,
                        OrderRepository orderRepository) {
        super(repository, orderMapper);
        this.userRepository = userRepository;
        this.productServiceRepository = productServiceRepository;
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    @Override
    @Transactional
    public OrderDTO create(OrderDTO newObject) {
        User user = userRepository.findById(newObject.getUserId())
                .orElseThrow(() -> new NotFoundException("User с ID " + newObject.getUserId() + " не найден"));

        ProductService productService = productServiceRepository.findById(newObject.getProductServiceId())
                .orElseThrow(() -> new NotFoundException("ProductService с ID " + newObject.getProductServiceId() + " не найден"));

        Integer quantity = newObject.getQuantity() != null && newObject.getQuantity() > 0 ? newObject.getQuantity() : 1;
        BigDecimal totalPrice = productService.getPrice().multiply(BigDecimal.valueOf(quantity));

        if (user.getBalance().compareTo(totalPrice) < 0) {
            throw new RuntimeException("Недостаточно средств на балансе");
        }

        user.setBalance(user.getBalance().subtract(totalPrice));
        userRepository.save(user);

        Order order = mapper.toEntity(newObject);
        order.setQuantity(quantity);
        order.setUser(user);
        order.setProductService(productService);
        order.setFinalPrice(totalPrice);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("в обработке");

        if (productService.getProductCategory() != null && productService.getProductCategory().getId() == 3) {
            Optional<Order> existingOrder = orderRepository.findByUserAndProductServiceCategoryId(user, 3L);
            existingOrder.ifPresent(orderRepository::delete);
            user.setTariff(productService);
            userRepository.save(user);
        }

        Order savedOrder = repository.save(order);
        return mapper.toDTO(savedOrder);
    }

    @Override
    @Transactional
    public OrderDTO update(OrderDTO updatedObject) {
        Order existingOrder = repository.findById(updatedObject.getId())
                .orElseThrow(() -> new NotFoundException("Order с ID " + updatedObject.getId() + " не найден"));

        User user = userRepository.findById(updatedObject.getUserId())
                .orElseThrow(() -> new NotFoundException("User с ID " + updatedObject.getUserId() + " не найден"));

        ProductService productService = productServiceRepository.findById(updatedObject.getProductServiceId())
                .orElseThrow(() -> new NotFoundException("ProductService с ID " + updatedObject.getProductServiceId() + " не найден"));

        Integer quantity = updatedObject.getQuantity() != null && updatedObject.getQuantity() > 0 ? updatedObject.getQuantity() : 1;
        updatedObject.setFinalPrice(productService.getPrice().multiply(new BigDecimal(quantity)));

        Order orderToUpdate = mapper.toEntity(updatedObject);
        orderToUpdate.setQuantity(quantity);
        orderToUpdate.setProductService(productService);
        orderToUpdate.setUser(user);

        Order updatedOrder = repository.save(orderToUpdate);
        return mapper.toDTO(updatedOrder);
    }

    @Transactional
    public OrderDTO updateOrderStatus(Long orderId, String status) {
        Order order = repository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));
        order.setStatus(status);
        Order updatedOrder = repository.save(order);
        return mapper.toDTO(updatedOrder);
    }

    @Transactional(readOnly = true)
    public Page<OrderDTO> getAllOrders(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        return orders.map(mapper::toDTO);
    }

    @Override
    @Transactional
    public void delete(final Long id) {
        repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Order с ID " + id + " не найден"));
        repository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public OrderDTO findByOrderDateAndUserId(LocalDateTime orderDate, Long userId) {
        return mapper.toDTO(orderRepository.findByOrderDateAndUserId(orderDate, userId)
                .orElseThrow(() -> new NotFoundException("Заказ не найден")));
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> findByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> findByUserIdAndCategoryIds(Long userId) {
        List<Order> orders = orderRepository.findByUserIdAndCategoryIds(userId);
        return orders.stream().map(mapper::toDTO).collect(Collectors.toList());
    }
}