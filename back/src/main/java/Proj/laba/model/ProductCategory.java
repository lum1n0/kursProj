package Proj.laba.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
@Table(name = "product_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "default_generator", sequenceName = "product_categories_seq", allocationSize = 1)
public class ProductCategory extends GenericModel {

    @Column(name = "title", nullable = false, unique = true)
    private String title;

    @Column(name = "description")
    private String Description;

    @OneToMany(mappedBy = "productCategory")
    private List<ProductService> productServices;
}

