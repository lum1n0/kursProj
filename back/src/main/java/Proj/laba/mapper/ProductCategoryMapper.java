package Proj.laba.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import Proj.laba.dto.ProductCategoryDTO;
import Proj.laba.model.ProductCategory;

import java.util.Collections;
import java.util.List;

@Component
public class ProductCategoryMapper extends GenericMapper<ProductCategory, ProductCategoryDTO> {

    private final ModelMapper modelMapper;

    public ProductCategoryMapper(@Qualifier("manualModelMapper") ModelMapper modelMapper) {
        super(ProductCategory.class, ProductCategoryDTO.class, modelMapper);
        this.modelMapper = modelMapper;

        setupMappers();
    }

    private void setupMappers() {
        // Настройка маппинга из DTO в Entity
        TypeMap<ProductCategoryDTO, ProductCategory> dtoToEntityTypeMap = modelMapper.getTypeMap(ProductCategoryDTO.class, ProductCategory.class);
        if (dtoToEntityTypeMap == null) {
            dtoToEntityTypeMap = modelMapper.createTypeMap(ProductCategoryDTO.class, ProductCategory.class);
        }
        dtoToEntityTypeMap.setPostConverter(context -> {
            mapSpecificFields(context.getSource(), context.getDestination());
            return context.getDestination();
        });

        // Настройка маппинга из Entity в DTO
        TypeMap<ProductCategory, ProductCategoryDTO> entityToDtoTypeMap = modelMapper.getTypeMap(ProductCategory.class, ProductCategoryDTO.class);
        if (entityToDtoTypeMap == null) {
            entityToDtoTypeMap = modelMapper.createTypeMap(ProductCategory.class, ProductCategoryDTO.class);
        }
        entityToDtoTypeMap.setPostConverter(context -> {
            mapSpecificFields(context.getSource(), context.getDestination());
            return context.getDestination();
        });
    }

    @Override
    public ProductCategoryDTO toDTO(ProductCategory entity) {
        if (entity == null) {
            return null;
        }

        ProductCategoryDTO dto = new ProductCategoryDTO();
        dto.setId(entity.getId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setDeletedWhen(entity.getDeletedWhen());
        dto.setDeletedBy(entity.getDeletedBy());
        dto.setDeleted(entity.isDeleted());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());

        return dto;
    }

    @Override
    public ProductCategory toEntity(ProductCategoryDTO dto) {
        if (dto == null) {
            return null;
        }

        ProductCategory entity = new ProductCategory();
        entity.setId(dto.getId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setDeletedWhen(dto.getDeletedWhen());
        entity.setDeletedBy(dto.getDeletedBy());
        entity.setDeleted(dto.isDeleted());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());

        return entity;
    }

    @Override
    protected void mapSpecificFields(ProductCategoryDTO source, ProductCategory destination) {
        destination.setId(source.getId());
        destination.setTitle(source.getTitle());
        destination.setDescription(source.getDescription());
    }

    @Override
    protected void mapSpecificFields(ProductCategory source, ProductCategoryDTO destination) {
        destination.setId(source.getId());
        destination.setTitle(source.getTitle());
        destination.setDescription(source.getDescription());
    }

    @Override
    protected List<Long> getIds(ProductCategory entity) {
        return Collections.singletonList(entity.getId());
    }
}