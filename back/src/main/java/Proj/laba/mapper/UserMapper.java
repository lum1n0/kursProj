package Proj.laba.mapper;


import Proj.laba.dto.SimpleRegistrationDTO;
import Proj.laba.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class UserMapper extends GenericMapper<User, SimpleRegistrationDTO> {

    public UserMapper(ModelMapper modelMapper) {
        super(User.class, SimpleRegistrationDTO.class, modelMapper);
    }

    @Override
    protected void mapSpecificFields(SimpleRegistrationDTO source, User destination) {
        // Специфическое мапирование, если необходимо
    }

    @Override
    protected void mapSpecificFields(User source, SimpleRegistrationDTO destination) {
        // Специфическое мапирование, если необходимо
    }

    @Override
    protected void setupMapper() {
        modelMapper.createTypeMap(User.class, SimpleRegistrationDTO.class)
                .addMappings(mapper -> mapper.skip(SimpleRegistrationDTO::setPassword));
    }

    @Override
    protected List<Long> getIds(User entity) {
        return Collections.singletonList(entity.getId());
    }
}
