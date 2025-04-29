package Proj.laba.mapper;

import Proj.laba.dto.OrderDTO;
import Proj.laba.model.Order;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;

@Component
public class OrderMapper extends GenericMapper<Order, OrderDTO> {

    private static final Logger log = LoggerFactory.getLogger(OrderMapper.class);

    @Autowired
    public OrderMapper(@Qualifier("autoModelMapper") ModelMapper modelMapper) {
        super(Order.class, OrderDTO.class, modelMapper);
    }

    @PostConstruct
    protected void setupMapper() {
        // Создаем пустую карту типов и настраиваем явные маппинги
        modelMapper.createTypeMap(Order.class, OrderDTO.class, "orderToOrderDTOMap")
                .addMappings(mapper -> {
                    // Маппим ID сервиса продукта
                    mapper.map(src -> src.getProductService() != null ?
                                    src.getProductService().getId() : null,
                            OrderDTO::setProductServiceId);

                    // Маппим ID пользователя
                    mapper.map(src -> src.getUser() != null ?
                                    src.getUser().getId() : null,
                            OrderDTO::setUserId);
                })
                .implicitMappings();  // Включаем неявные маппинги после явных

        // Создаем пустую карту для обратного маппинга
        modelMapper.createTypeMap(OrderDTO.class, Order.class, "orderDTOToOrderMap");
        // Не выполняем skip, так как установка полей будет происходить в сервисе
    }

    @Override
    protected void mapSpecificFields(OrderDTO source, Order destination) {
        // Здесь можно добавить специфическую логику маппинга, если необходимо
        log.debug("Mapping from OrderDTO to Order: {}", source);
    }

    @Override
    protected void mapSpecificFields(Order source, OrderDTO destination) {
        // Здесь можно добавить специфическую логику маппинга, если необходимо
        log.debug("Mapping from Order to OrderDTO: {}", source);
    }

    @Override
    protected List<Long> getIds(Order entity) {
        return Collections.singletonList(entity.getId());
    }
}