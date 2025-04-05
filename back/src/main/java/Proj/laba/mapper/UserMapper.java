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
        modelMapper.createTypeMap(User.class, UserResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(User::getId, UserResponseDTO::setId);
                    mapper.map(User::getLogin, UserResponseDTO::setLogin);
                    mapper.map(User::getFirstName, UserResponseDTO::setFirstName);
                    mapper.map(User::getLastName, UserResponseDTO::setLastName);
                    mapper.map(User::getEmail, UserResponseDTO::setEmail);
                    mapper.map(User::getPhone, UserResponseDTO::setPhone);
                    mapper.map(User::getAddress, UserResponseDTO::setAddress);
                    mapper.map(src -> src.getRole().getTitle(), UserResponseDTO::setRole);
                    mapper.map(src -> src.getTariff() != null ? src.getTariff().getName() : "Нет тарифа", UserResponseDTO::setTariffName);
                });

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
    protected void mapSpecificFields(UserResponseDTO source, User destination) {
        // Не требуется
    }

    @Override
    protected void mapSpecificFields(User source, UserResponseDTO destination) {
        // Не требуется
    }

    @Override
    protected List<Long> getIds(User entity) {
        return Collections.singletonList(entity.getId());
    }
}