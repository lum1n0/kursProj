package Proj.laba.mapper;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.model.ProductCategory;
import Proj.laba.model.ProductService;
import Proj.laba.reposirory.ProductCategoryRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.webjars.NotFoundException;

import java.util.Collections;
import java.util.List;

@Component
public class ProductServiceMapper extends GenericMapper<ProductService, ProductServiceDTO> {

    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductServiceMapper(ModelMapper modelMapper, ProductCategoryRepository productCategoryRepository) {
        super(ProductService.class, ProductServiceDTO.class, modelMapper);
        this.productCategoryRepository = productCategoryRepository;

        // Настройка маппинга из DTO в сущность
        TypeMap<ProductServiceDTO, ProductService> dtoToEntityMap = modelMapper.getTypeMap(ProductServiceDTO.class, ProductService.class);
        if (dtoToEntityMap == null) {
            dtoToEntityMap = modelMapper.createTypeMap(ProductServiceDTO.class, ProductService.class);
        }
        dtoToEntityMap.setPostConverter(converter -> {
            ProductServiceDTO source = converter.getSource();
            ProductService destination = converter.getDestination();
            mapSpecificFields(source, destination);
            return destination;
        });

        // Настройка маппинга из сущности в DTO
        TypeMap<ProductService, ProductServiceDTO> entityToDtoMap = modelMapper.getTypeMap(ProductService.class, ProductServiceDTO.class);
        if (entityToDtoMap == null) {
            entityToDtoMap = modelMapper.createTypeMap(ProductService.class, ProductServiceDTO.class);
        }
        entityToDtoMap.setPostConverter(converter -> {
            ProductService source = converter.getSource();
            ProductServiceDTO destination = converter.getDestination();
            mapSpecificFields(source, destination);
            return destination;
        });
    }

    @Override
    protected void mapSpecificFields(ProductServiceDTO source, ProductService destination) {
        if (source.getCategoryId() != null) {
            System.out.println("Поиск категории с ID: " + source.getCategoryId());
            ProductCategory category = productCategoryRepository.findById(source.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("Категория с ID " + source.getCategoryId() + " не найдена"));
            destination.setProductCategory(category);
            System.out.println("Установлена категория: " + category.getId());
        } else {
            System.out.println("categoryId is null");
        }
    }

    @Override
    protected void mapSpecificFields(ProductService source, ProductServiceDTO destination) {
        if (source.getProductCategory() != null) {
            destination.setCategoryId(source.getProductCategory().getId());
            System.out.println("Установлен categoryId: " + source.getProductCategory().getId());
        } else {
            System.out.println("Категория null для товара: " + source.getId());
        }
    }

    @Override
    protected List<Long> getIds(ProductService entity) {
        return Collections.singletonList(entity.getId());
    }
}