package Proj.laba.mapper;

import Proj.laba.dto.OrderDTO;
import Proj.laba.model.Order;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class OrderMapper extends GenericMapper<Order, OrderDTO> {

    public OrderMapper(ModelMapper modelMapper) {
        super(Order.class, OrderDTO.class, modelMapper);
    }

    @Override
    protected void setupMapper() {
        modelMapper.createTypeMap(Order.class, OrderDTO.class)
                .addMappings(mapper -> {
                    mapper.map(Order::getId, OrderDTO::setId);
                    mapper.map(src -> src.getProductService().getId(), OrderDTO::setProductServiceId);
                    mapper.map(src -> src.getUser().getId(), OrderDTO::setUserId);
                    mapper.map(Order::getQuantity, OrderDTO::setQuantity);
                    mapper.map(Order::getFinalPrice, OrderDTO::setFinalPrice);
                    mapper.map(Order::getOrderDate, OrderDTO::setOrderDate);
                    mapper.map(Order::getCreatedBy, OrderDTO::setCreatedBy);
                    mapper.map(Order::getDeletedBy, OrderDTO::setDeletedBy);
                    mapper.map(Order::getDeletedWhen, OrderDTO::setDeletedWhen);
                    mapper.map(Order::isDeleted, OrderDTO::setDeleted);
                });

        modelMapper.createTypeMap(OrderDTO.class, Order.class)
                .addMappings(mapper -> {
                    mapper.skip(Order::setProductService);
                    mapper.skip(Order::setUser);
                });
    }

    @Override
    protected void mapSpecificFields(OrderDTO source, Order destination) {
        // При необходимости добавьте специфическую логику маппинга
    }

    @Override
    protected void mapSpecificFields(Order source, OrderDTO destination) {
        // При необходимости добавьте специфическую логику маппинга
    }

    @Override
    protected List<Long> getIds(Order entity) {
        return Collections.singletonList(entity.getId());
    }
}