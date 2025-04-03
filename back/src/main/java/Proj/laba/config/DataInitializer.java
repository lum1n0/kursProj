package Proj.laba.config;

import Proj.laba.model.ProductCategory;
import Proj.laba.model.ProductService;
import Proj.laba.reposirory.ProductCategoryRepository;
import Proj.laba.reposirory.ProductServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductCategoryRepository productCategoryRepository;
    private final ProductServiceRepository productServiceRepository;

    @Autowired
    public DataInitializer(ProductCategoryRepository productCategoryRepository, ProductServiceRepository productServiceRepository) {
        this.productCategoryRepository = productCategoryRepository;
        this.productServiceRepository = productServiceRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Инициализация категорий
        if (productCategoryRepository.count() == 0) {
            ProductCategory modems = new ProductCategory();
            modems.setTitle("Модемы и роутеры");
            modems.setDescription("Устройства для подключения к интернету");

            ProductCategory tv = new ProductCategory();
            tv.setTitle("Приставки и ТВ");
            tv.setDescription("Оборудование для телевидения");

            ProductCategory sim = new ProductCategory();
            sim.setTitle("Сим-карты");
            sim.setDescription("Тарифы и сим-карты для связи");

            productCategoryRepository.save(modems);
            productCategoryRepository.save(tv);
            productCategoryRepository.save(sim);

            System.out.println("Категории успешно добавлены в базу данных!");
        } else {
            System.out.println("Категории уже существуют в базе данных.");
        }

        // Инициализация начального объекта ProductService
        if (productServiceRepository.count() == 0) {
            ProductService initialProduct = new ProductService();
            initialProduct.setName("начальный тариф");
            initialProduct.setPrice(BigDecimal.ZERO);
            initialProduct.setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQY54bP2CxjmHdg_6yAGjR0Zjgc6d7v-_Ng&s");

            // Привязка к категории с id = 3
            ProductCategory category = productCategoryRepository.findById(3L)
                .orElseThrow(() -> new IllegalArgumentException("Категория с id=1 не найдена"));
            initialProduct.setProductCategory(category);

            productServiceRepository.save(initialProduct);
            System.out.println("Начальный объект ProductService успешно добавлен в базу данных!");
        } else {
            System.out.println("Объекты ProductService уже существуют в базе данных.");
        }
    }
}