package Proj.laba.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.modelmapper.config.Configuration.AccessLevel;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT) // Строгое соответствие
                .setFieldMatchingEnabled(true)
                .setSkipNullEnabled(true)
                .setFieldAccessLevel(AccessLevel.PRIVATE)
                .setPropertyCondition(context -> false); // Отключаем автоматический маппинг
        return modelMapper;
    }
}