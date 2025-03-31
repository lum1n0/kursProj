package Proj.laba.config;

import Proj.laba.model.ProductCategory;
import Proj.laba.reposirory.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public DataInitializer(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Проверяем, есть ли уже категории в базе
        if (productCategoryRepository.count() == 0) {
            // Создаём категории
            ProductCategory modems = new ProductCategory();
            modems.setTitle("Модемы и роутеры");
            modems.setDescription("Устройства для подключения к интернету");

            ProductCategory tv = new ProductCategory();
            tv.setTitle("Приставки и ТВ");
            tv.setDescription("Оборудование для телевидения");

            ProductCategory sim = new ProductCategory();
            sim.setTitle("Сим-карты");
            sim.setDescription("Тарифы и сим-карты для связи");

            // Сохраняем категории в базу
            productCategoryRepository.save(modems);
            productCategoryRepository.save(tv);
            productCategoryRepository.save(sim);

            System.out.println("Категории успешно добавлены в базу данных!");
        } else {
            System.out.println("Категории уже существуют в базе данных.");
        }
    }
}