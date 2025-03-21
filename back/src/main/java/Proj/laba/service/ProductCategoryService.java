package Proj.laba.service;

import Proj.laba.dto.ProductCategoryDTO;
import Proj.laba.mapper.ProductCategoryMapper;
import Proj.laba.model.ProductCategory;
import Proj.laba.reposirory.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductCategoryService extends GenericService<ProductCategory, ProductCategoryDTO> {

    public ProductCategoryService(GenericRepository<ProductCategory> repository, ProductCategoryMapper mapper) {
        super(repository, mapper);
    }
}
