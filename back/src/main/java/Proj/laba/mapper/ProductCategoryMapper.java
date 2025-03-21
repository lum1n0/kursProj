package Proj.laba.mapper;

import Proj.laba.dto.ProductCategoryDTO;
import Proj.laba.model.ProductCategory;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class ProductCategoryMapper extends GenericMapper<ProductCategory, ProductCategoryDTO> {

    public ProductCategoryMapper(ModelMapper modelMapper) {
        super(ProductCategory.class, ProductCategoryDTO.class, modelMapper);
    }

    @Override
    protected void mapSpecificFields(ProductCategoryDTO source, ProductCategory destination) {
        // Add specific mapping logic if needed
    }

    @Override
    protected void mapSpecificFields(ProductCategory source, ProductCategoryDTO destination) {
        // Add specific mapping logic if needed
    }

    @Override
    protected List<Long> getIds(ProductCategory entity) {
        return Collections.singletonList(entity.getId());
    }
}
