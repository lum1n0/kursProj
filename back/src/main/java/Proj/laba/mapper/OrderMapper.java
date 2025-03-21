//package Proj.laba.mapper;
//
//import Proj.laba.dto.OrderDTO;
//import Proj.laba.model.Order;
//import Proj.laba.model.ProductService;
//import Proj.laba.model.User;
//import org.modelmapper.ModelMapper;
//import org.springframework.stereotype.Component;
//
//import java.util.Arrays;
//import java.util.List;
//
//@Component
//public class OrderMapper extends GenericMapper<Order, OrderDTO> {
//
//    protected OrderMapper(ModelMapper modelMapper) {
//        super(Order.class, OrderDTO.class, modelMapper);
//        setupMapper();
//    }
//    @Override
//    protected void mapSpecificFields(OrderDTO source, Order destination) {
//        // Добавляем дополнительную проверку
//        if (source.getProductServiceId() != null) {
//            ProductService productService = new ProductService();
//            productService.setId(source.getProductServiceId());
//            destination.setProductService(productService);
//        }
//
//        if (source.getUserId() != null) {
//            User user = new User();
//            user.setId(source.getUserId());
//            destination.setUser(user);
//        }
//
//        if (destination.getProductService() != null &&
//                source.getProductServiceId().equals(destination.getProductService().getId())) {
//            return;
//        }
//        destination.setProductService(null);
//
//        if (destination.getUser() != null &&
//                source.getUserId().equals(destination.getUser().getId())) {
//            return;
//        }
//        destination.setUser(null);
//
//    }
//
//
//
//    @Override
//    protected List<Long> getIds(Order entity) {
//        return Arrays.asList(
//                entity.getId(),
//                entity.getProductService() != null ? entity.getProductService().getId() : null,
//                entity.getUser() != null ? entity.getUser().getId() : null
//        );
//    }
//
//    @Override
//    protected void setupMapper() {
//        modelMapper.createTypeMap(OrderDTO.class, Order.class)
//                .addMappings(mapper -> {
//                    // Не пропускаем маппинг, а устанавливаем заглушки
//                    mapper.map(OrderDTO::getProductServiceId, (dest, v) -> {
//                        ProductService ps = new ProductService();
//                        ps.setId((Long) v);
//                        dest.setProductService(ps);
//                        mapper.skip(Order::setProductService);
//                        mapper.skip(Order::setUser);
//                    });
//                    mapper.map(OrderDTO::getUserId, (dest, v) -> {
//                        User user = new User();
//                        user.setId((Long) v);
//                        dest.setUser(user);
//                    });
//                });
//
//        modelMapper.createTypeMap(Order.class, OrderDTO.class)
//                .addMappings(mapper -> {
//                    mapper.map(src -> src.getProductService().getId(), OrderDTO::setProductServiceId);
//                    mapper.map(src -> src.getUser().getId(), OrderDTO::setUserId);
//                    mapper.map(src -> src.getProductService() != null ?
//                            src.getProductService().getId() : null, OrderDTO::setProductServiceId);
//                    mapper.map(src -> src.getUser() != null ?
//                            src.getUser().getId() : null, OrderDTO::setUserId);
//                });
//    }
//
//
//
//    @Override
//    protected void mapSpecificFields(Order source, OrderDTO destination) {
//        // При маппинге из сущности в DTO нужно установить ID связанных сущностей
//        if (source.getProductService() != null) {
//            destination.setProductServiceId(source.getProductService().getId());
//        }
//        if (source.getUser() != null) {
//            destination.setUserId(source.getUser().getId());
//        }
//
//
//    }
//
//
//
//
//}


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
                    mapper.map(src -> src.getProductService().getId(), OrderDTO::setProductServiceId);
                    mapper.map(src -> src.getUser().getId(), OrderDTO::setUserId);
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
