package Proj.laba.service;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.mapper.ProductServiceMapper;
import Proj.laba.model.ProductService;
import Proj.laba.reposirory.GenericRepository;
import org.webjars.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductServiceService extends GenericService<ProductService, ProductServiceDTO> {

    public ProductServiceService(GenericRepository<ProductService> repository,
                                 ProductServiceMapper mapper) {
        super(repository, mapper);
    }

    @Override
    @Transactional
    public void delete(final Long id) {
        // Проверяем существование записи перед удалением
        repository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "ProductService с ID " + id + " не найден"));
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public ProductServiceDTO create(ProductServiceDTO newObject) {
        // Дополнительная валидация перед созданием, если необходимо
        if (newObject.getPrice() <= 0) {
            throw new IllegalArgumentException("Цена должна быть положительной");
        }
        return super.create(newObject);
    }

    @Override
    @Transactional
    public ProductServiceDTO update(ProductServiceDTO updatedObject) {
        // Проверяем существование записи перед обновлением
        repository.findById(updatedObject.getId())
                .orElseThrow(() -> new NotFoundException(
                        "ProductService с ID " + updatedObject.getId() + " не найден"));

        if (updatedObject.getPrice() <= 0) {
            throw new IllegalArgumentException("Цена должна быть положительной");
        }
        return super.update(updatedObject);
    }
}
