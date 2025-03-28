package Proj.laba.mapper;

import Proj.laba.dto.UserResponseDTO;
import Proj.laba.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class UserMapper extends GenericMapper<User, UserResponseDTO> {

    public UserMapper(ModelMapper modelMapper) {
        super(User.class, UserResponseDTO.class, modelMapper);
    }

    @Override
    protected void setupMapper() {
        // Маппинг из User в UserResponseDTO
        modelMapper.createTypeMap(User.class, UserResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getRole().getTitle(), UserResponseDTO::setRole);
                    mapper.map(src -> src.getTariff() != null ? src.getTariff().getId() : null, UserResponseDTO::setTariffId);
                });

        // Маппинг из UserResponseDTO в User (игнорируем поля, которые не должны обновляться напрямую)
        modelMapper.createTypeMap(UserResponseDTO.class, User.class)
                .addMappings(mapper -> {
                    mapper.skip(User::setRole); // Роль устанавливается отдельно через RoleRepository
                    mapper.skip(User::setTariff); // Тариф устанавливается отдельно через TariffRepository
                });
    }

    @Override
    protected void mapSpecificFields(UserResponseDTO source, User destination) {
        // Здесь можно добавить специфическое мапирование, если нужно
    }

    @Override
    protected void mapSpecificFields(User source, UserResponseDTO destination) {
        // Здесь можно добавить специфическое мапирование, если нужно
    }

    @Override
    protected List<Long> getIds(User entity) {
        return Collections.singletonList(entity.getId());
    }
}