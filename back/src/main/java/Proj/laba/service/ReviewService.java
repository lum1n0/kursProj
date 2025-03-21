package Proj.laba.service;

import Proj.laba.dto.ReviewDTO;
import Proj.laba.mapper.ReviewMapper;
import Proj.laba.model.Review;
import Proj.laba.model.ProductService;
import Proj.laba.model.User;
import Proj.laba.reposirory.GenericRepository;
import Proj.laba.reposirory.ProductServiceRepository;
import Proj.laba.reposirory.UserRepository;
import Proj.laba.reposirory.ReviewRepository;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService extends GenericService<Review, ReviewDTO> {

    private final UserRepository userRepository;
    private final ProductServiceRepository productServiceRepository;
    private final ReviewRepository reviewRepository; // Добавляем ReviewRepository

    public ReviewService(GenericRepository<Review> repository, ReviewMapper mapper, UserRepository userRepository, ProductServiceRepository productServiceRepository, ReviewRepository reviewRepository) {
        super(repository, mapper);
        this.userRepository = userRepository;
        this.productServiceRepository = productServiceRepository;
        this.reviewRepository = reviewRepository; // Инициализируем ReviewRepository
    }

    @Override
    @Transactional
    public ReviewDTO create(ReviewDTO newObject) {
        // Находим связанные сущности
        User user = userRepository.findById(newObject.getUserId())
                .orElseThrow(() -> new NotFoundException(
                        "User с ID " + newObject.getUserId() + " не найден"));

        ProductService productService = productServiceRepository.findById(newObject.getProductServiceId())
                .orElseThrow(() -> new NotFoundException(
                        "ProductService с ID " + newObject.getProductServiceId() + " не найден"));

        // Создаем сущность через маппер
        Review review = mapper.toEntity(newObject); // используем mapper из GenericService

        // Устанавливаем связи
        review.setUser(user);
        review.setProductService(productService);

        review.setCreatedDate(LocalDateTime.now());

        // Сохраняем и возвращаем результат
        Review savedReview = repository.save(review);
        return mapper.toDTO(savedReview); // используем mapper из GenericService
    }

    @Override
    @Transactional
    public ReviewDTO update(ReviewDTO updatedObject) {
        // Проверяем существование заказа
        Review existingReview = repository.findById(updatedObject.getId())
                .orElseThrow(() -> new NotFoundException(
                        "Review с ID " + updatedObject.getId() + " не найден"));

        // Проверяем существование связанных сущностей
        User user = userRepository.findById(updatedObject.getUserId())
                .orElseThrow(() -> new NotFoundException(
                        "User с ID " + updatedObject.getUserId() + " не найден"));

        ProductService productService = productServiceRepository.findById(updatedObject.getProductServiceId())
                .orElseThrow(() -> new NotFoundException(
                        "ProductService с ID " + updatedObject.getProductServiceId() + " не найден"));

        Review reviewToUpdate = mapper.toEntity(updatedObject); // используем mapper из GenericService

        // Устанавливаем связи
        reviewToUpdate.setProductService(productService);
        reviewToUpdate.setUser(user);

        // Сохраняем и возвращаем обновленный результат
        Review updatedReview = repository.save(reviewToUpdate);
        return mapper.toDTO(updatedReview); // используем mapper из GenericService
    }

    @Override
    @Transactional
    public void delete(final Long id) {
        // Проверяем существование записи перед удалением
        repository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Review с ID " + id + " не найден"));
        repository.deleteById(id);
    }

    // Добавляем метод для поиска по рейтингу
    public List<ReviewDTO> findByRating(Integer rating) {
        return reviewRepository.findByRating(rating).stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
}
