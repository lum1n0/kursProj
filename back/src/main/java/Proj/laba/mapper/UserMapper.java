package Proj.laba.mapper;

import Proj.laba.dto.UserResponseDTO;
import Proj.laba.model.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class UserMapper extends GenericMapper<User, UserResponseDTO> {

    private static final Logger log = LoggerFactory.getLogger(UserMapper.class);

    public UserMapper(ModelMapper modelMapper) {
        super(User.class, UserResponseDTO.class, modelMapper);
    }

    @Override
    protected void setupMapper() {
        log.info("Настройка маппинга User -> UserResponseDTO");
        modelMapper.createTypeMap(User.class, UserResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(User::getId, UserResponseDTO::setId);
                    mapper.map(User::getLogin, UserResponseDTO::setLogin);
                    mapper.map(User::getFirstName, UserResponseDTO::setFirstName);
                    mapper.map(User::getLastName, UserResponseDTO::setLastName);
                    mapper.map(User::getEmail, UserResponseDTO::setEmail);
                    mapper.map(User::getPhone, UserResponseDTO::setPhone);
                    mapper.map(User::getAddress, UserResponseDTO::setAddress);
                    mapper.map(src -> src.getRole() != null ? src.getRole().getTitle() : null, UserResponseDTO::setRole);
                    mapper.map(src -> src.getTariff() != null ? src.getTariff().getName() : "Нет тарифа", UserResponseDTO::setTariffName);
                });

        log.info("Настройка маппинга UserResponseDTO -> User");
        modelMapper.createTypeMap(UserResponseDTO.class, User.class)
                .addMappings(mapper -> {
                    mapper.map(UserResponseDTO::getId, User::setId);
                    mapper.map(UserResponseDTO::getLogin, User::setLogin);
                    mapper.map(UserResponseDTO::getFirstName, User::setFirstName);
                    mapper.map(UserResponseDTO::getLastName, User::setLastName);
                    mapper.map(UserResponseDTO::getEmail, User::setEmail);
                    mapper.map(UserResponseDTO::getPhone, User::setPhone);
                    mapper.map(UserResponseDTO::getAddress, User::setAddress);
                });
    }

    @Override
    public UserResponseDTO toDTO(User entity) {
        if (entity == null) {
            log.debug("Сущность User равна null, возвращаем null");
            return null;
        }
        log.debug("Маппинг User в UserResponseDTO: id={}, login={}", entity.getId(), entity.getLogin());
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(entity.getId());
        dto.setLogin(entity.getLogin());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setAddress(entity.getAddress());
        dto.setRole(entity.getRole() != null ? entity.getRole().getTitle() : null);
        dto.setTariffName(entity.getTariff() != null ? entity.getTariff().getName() : "Нет тарифа");
        log.debug("Результат маппинга: {}", dto);
        return dto;
    }

    @Override
    protected void mapSpecificFields(UserResponseDTO source, User destination) {
        // Не требуется, маппинг настроен в setupMapper
    }

    @Override
    protected void mapSpecificFields(User source, UserResponseDTO destination) {
        // Не требуется, маппинг настроен в setupMapper
    }

    @Override
    protected List<Long> getIds(User entity) {
        return Collections.singletonList(entity.getId());
    }
}