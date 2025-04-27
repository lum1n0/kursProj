package Proj.laba.service;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.mapper.ProductServiceMapper;
import Proj.laba.model.ProductCategory;
import Proj.laba.model.ProductService;
import Proj.laba.reposirory.ProductCategoryRepository;
import Proj.laba.reposirory.ProductServiceRepository;
import org.webjars.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceService extends GenericService<ProductService, ProductServiceDTO> {

    private final ProductServiceRepository repository;
    private final ProductServiceMapper mapper;

    // Предполагается, что у вас есть репозиторий для категорий. Добавьте его в зависимости, если он еще не внедрен.
    private final ProductCategoryRepository productCategoryRepository;

    public ProductServiceService(ProductServiceRepository repository,
                                 ProductServiceMapper mapper,
                                 ProductCategoryRepository productCategoryRepository) {
        super(repository, mapper);
        this.repository = repository;
        this.mapper = mapper;
        this.productCategoryRepository = productCategoryRepository;
    }

    @Override
    public ProductServiceMapper getMapper() {
        return mapper;
    }

    @Override
    @Transactional
    public void delete(final Long id) {
        repository.findById(id)
                .orElseThrow(() -> new NotFoundException("ProductService с ID " + id + " не найден"));
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public ProductServiceDTO create(ProductServiceDTO newObject) {
        ProductService entity = mapper.toEntity(newObject);
        ProductService savedEntity = repository.save(entity);
        return mapper.toDTO(savedEntity);
    }

    @Override
    @Transactional
    public ProductServiceDTO update(ProductServiceDTO updatedObject) {
        // Загружаем существующую сущность из базы данных
        ProductService existingEntity = repository.findById(updatedObject.getId())
                .orElseThrow(() -> new NotFoundException("ProductService с ID " + updatedObject.getId() + " не найден"));

        // Проверяем, что цена положительная
        if (updatedObject.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Цена должна быть положительной");
        }

        // Обновляем поля существующей сущности на основе DTO
        existingEntity.setName(updatedObject.getName());
        existingEntity.setPrice(updatedObject.getPrice());
        existingEntity.setStatus(updatedObject.getStatus());
        existingEntity.setDescription(updatedObject.getDescription());
        existingEntity.setImageUrl(updatedObject.getImageUrl());

        // Обновляем категорию, если она указана в DTO
        if (updatedObject.getCategoryId() != null) {
            ProductCategory category = productCategoryRepository.findById(updatedObject.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("Категория с ID " + updatedObject.getCategoryId() + " не найдена"));
            existingEntity.setProductCategory(category);
        }

        // Сохраняем обновленную сущность
        ProductService updatedEntity = repository.save(existingEntity);
        return mapper.toDTO(updatedEntity);
    }

    @Transactional(readOnly = true)
    public List<ProductServiceDTO> getAllProductsWithCategory() {
        List<ProductService> entities = repository.findAllWithCategory();
        return mapper.toDTOs(entities);
    }

    @Transactional(readOnly = true)
    public List<ProductServiceDTO> searchProducts(String name, BigDecimal minPrice, BigDecimal maxPrice) {
        List<ProductService> entities;
        if (name != null && !name.isEmpty() && minPrice != null && maxPrice != null) {
            entities = repository.findByNameContainingIgnoreCaseAndPriceBetween(name, minPrice, maxPrice);
        } else if (name != null && !name.isEmpty()) {
            entities = repository.findByNameContainingIgnoreCase(name);
        } else if (minPrice != null && maxPrice != null) {
            entities = repository.findByPriceBetween(minPrice, maxPrice);
        } else {
            entities = repository.findAllWithCategory();
        }
        return entities.stream().map(mapper::toDTO).collect(Collectors.toList());
    }
}