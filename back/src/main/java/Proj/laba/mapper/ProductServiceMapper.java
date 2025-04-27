package Proj.laba.mapper;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.model.ProductCategory;
import Proj.laba.model.ProductService;
import Proj.laba.reposirory.ProductCategoryRepository;
import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;
import org.webjars.NotFoundException;

import java.util.Collections;
import java.util.List;

@Component
public class ProductServiceMapper extends GenericMapper<ProductService, ProductServiceDTO> {

    private final ProductCategoryRepository productCategoryRepository;

    public ProductServiceMapper(ModelMapper modelMapper, ProductCategoryRepository productCategoryRepository) {
        super(ProductService.class, ProductServiceDTO.class, modelMapper);
        this.productCategoryRepository = productCategoryRepository;
    }

    @Override
    @PostConstruct
    protected void setupMapper() {
        super.setupMapper();

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
    }

    @Override
    protected void mapSpecificFields(ProductServiceDTO source, ProductService destination) {
        destination.setName(source.getName());
        destination.setPrice(source.getPrice());
        destination.setQuantity(source.getQuantity()); // Маппим quantity
        destination.setImageUrl(source.getImageUrl());
        if (source.getCategoryId() != null) {
            ProductCategory category = productCategoryRepository.findById(source.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("Категория с ID " + source.getCategoryId() + " не найдена"));
            destination.setProductCategory(category);
        }
    }

    @Override
    protected void mapSpecificFields(ProductService source, ProductServiceDTO destination) {
        destination.setName(source.getName());
        destination.setPrice(source.getPrice());
        destination.setQuantity(source.getQuantity()); // Маппим quantity
        destination.setImageUrl(source.getImageUrl());
        if (source.getProductCategory() != null) {
            destination.setCategoryId(source.getProductCategory().getId());
        }
        destination.setId(source.getId());
    }

    @Override
    protected List<Long> getIds(ProductService entity) {
        return Collections.singletonList(entity.getId());
    }
}