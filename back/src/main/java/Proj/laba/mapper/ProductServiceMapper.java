package Proj.laba.mapper;

import Proj.laba.dto.ProductServiceDTO;
import Proj.laba.model.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class ProductServiceMapper extends GenericMapper<ProductService, ProductServiceDTO> {

    protected ProductServiceMapper(ModelMapper modelMapper) {
        super(ProductService.class, ProductServiceDTO.class, modelMapper);
    }

    @Override
    protected void mapSpecificFields(ProductServiceDTO source, ProductService destination) {
        // В данном случае специфическое мапирование не требуется,
        // так как все поля мапятся автоматически
    }

    @Override
    protected void mapSpecificFields(ProductService source, ProductServiceDTO destination) {
        // В данном случае специфическое мапирование не требуется,
        // так как все поля мапятся автоматически
    }

    @Override
    protected List<Long> getIds(ProductService entity) {
        return Collections.singletonList(entity.getId());
    }
}
