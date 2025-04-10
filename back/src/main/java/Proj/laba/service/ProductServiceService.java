package Proj.laba.service;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.mapper.ProductServiceMapper;
import Proj.laba.model.ProductService;
import Proj.laba.reposirory.ProductServiceRepository;
import org.webjars.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductServiceService extends GenericService<ProductService, ProductServiceDTO> {

    private final ProductServiceRepository repository;
    private final ProductServiceMapper mapper;

    public ProductServiceService(ProductServiceRepository repository, ProductServiceMapper mapper) {
        super(repository, mapper);
        this.repository = repository;
        this.mapper = mapper;
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
        return mapper.toDTO(repository.save(entity));
    }

    @Override
    @Transactional
    public ProductServiceDTO update(ProductServiceDTO updatedObject) {
        repository.findById(updatedObject.getId())
                .orElseThrow(() -> new NotFoundException("ProductService с ID " + updatedObject.getId() + " не найден"));
        if (updatedObject.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
                throw new IllegalArgumentException("Цена должна быть положительной");
        }
        return super.update(updatedObject);
    }

    @Transactional(readOnly = true)
    public List<ProductServiceDTO> getAllProductsWithCategory() {
        List<ProductService> entities = repository.findAllWithCategory();
        return mapper.toDTOs(entities);
    }
}
