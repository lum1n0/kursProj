package Proj.laba.mapper;

import Proj.laba.dto.UserHistoryDTO;
import Proj.laba.model.UserHistory;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class UserHistoryMapper extends GenericMapper<UserHistory, UserHistoryDTO> {

    public UserHistoryMapper(ModelMapper modelMapper) {
        super(UserHistory.class, UserHistoryDTO.class, modelMapper);
    }

    @Override
    protected void setupMapper() {
        modelMapper.createTypeMap(UserHistory.class, UserHistoryDTO.class)
                .addMappings(mapper -> mapper.map(src -> src.getUser().getId(), UserHistoryDTO::setUserId));

        modelMapper.createTypeMap(UserHistoryDTO.class, UserHistory.class)
                .addMappings(mapper -> mapper.skip(UserHistory::setUser));
    }

    @Override
    protected void mapSpecificFields(UserHistoryDTO source, UserHistory destination) {}

    @Override
    protected void mapSpecificFields(UserHistory source, UserHistoryDTO destination) {}

    @Override
    protected List<Long> getIds(UserHistory entity) {
        return Collections.singletonList(entity.getId());
    }
}