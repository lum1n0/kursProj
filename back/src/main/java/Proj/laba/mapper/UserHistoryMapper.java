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
        // Маппинг из UserHistory в UserHistoryDTO
        modelMapper.createTypeMap(UserHistory.class, UserHistoryDTO.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getUser().getId(), UserHistoryDTO::setUserId);
                    mapper.map(UserHistory::getFieldName, UserHistoryDTO::setFieldName);
                    mapper.map(UserHistory::getOldValue, UserHistoryDTO::setOldValue);
                    mapper.map(UserHistory::getNewValue, UserHistoryDTO::setNewValue);
                    mapper.map(UserHistory::getChangedBy, UserHistoryDTO::setChangedBy);
                    mapper.map(UserHistory::getChangedWhen, UserHistoryDTO::setChangedWhen);
                    mapper.map(UserHistory::getId, UserHistoryDTO::setId);
                    mapper.map(UserHistory::getCreatedBy, UserHistoryDTO::setCreatedBy);
                    mapper.map(UserHistory::getDeletedBy, UserHistoryDTO::setDeletedBy);
                    mapper.map(UserHistory::getDeletedWhen, UserHistoryDTO::setDeletedWhen);
                    mapper.map(UserHistory::isDeleted, UserHistoryDTO::setDeleted);
                });

        // Маппинг из UserHistoryDTO в UserHistory
        modelMapper.createTypeMap(UserHistoryDTO.class, UserHistory.class)
                .addMappings(mapper -> {
                    mapper.skip(UserHistory::setUser); // User не маппится из DTO
                    mapper.map(UserHistoryDTO::getFieldName, UserHistory::setFieldName);
                    mapper.map(UserHistoryDTO::getOldValue, UserHistory::setOldValue);
                    mapper.map(UserHistoryDTO::getNewValue, UserHistory::setNewValue);
                    mapper.map(UserHistoryDTO::getChangedBy, UserHistory::setChangedBy);
                    mapper.map(UserHistoryDTO::getChangedWhen, UserHistory::setChangedWhen);
                    mapper.map(UserHistoryDTO::getId, UserHistory::setId);
                    mapper.map(UserHistoryDTO::getCreatedBy, UserHistory::setCreatedBy);
                    mapper.map(UserHistoryDTO::getDeletedBy, UserHistory::setDeletedBy);
                    mapper.map(UserHistoryDTO::getDeletedWhen, UserHistory::setDeletedWhen);
                    mapper.map(UserHistoryDTO::isDeleted, UserHistory::setDeleted);
                });
    }

    @Override
    public UserHistoryDTO toDTO(UserHistory entity) {
        if (entity == null) {
            return null;
        }
        UserHistoryDTO dto = new UserHistoryDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setFieldName(entity.getFieldName());
        dto.setOldValue(entity.getOldValue());
        dto.setNewValue(entity.getNewValue());
        dto.setChangedBy(entity.getChangedBy());
        dto.setChangedWhen(entity.getChangedWhen());
        dto.setCreatedBy(entity.getCreatedBy());

        dto.setDeletedBy(entity.getDeletedBy());
        dto.setDeletedWhen(entity.getDeletedWhen());
        dto.setDeleted(entity.isDeleted());
        return dto;
    }

    @Override
    public UserHistory toEntity(UserHistoryDTO dto) {
        if (dto == null) {
            return null;
        }
        UserHistory entity = new UserHistory();
        entity.setId(dto.getId());
        entity.setFieldName(dto.getFieldName());
        entity.setOldValue(dto.getOldValue());
        entity.setNewValue(dto.getNewValue());
        entity.setChangedBy(dto.getChangedBy());
        entity.setChangedWhen(dto.getChangedWhen());
        entity.setCreatedBy(dto.getCreatedBy());

        entity.setDeletedBy(dto.getDeletedBy());
        entity.setDeletedWhen(dto.getDeletedWhen());
        entity.setDeleted(dto.isDeleted());
        // User не маппится, так как его нет в DTO
        return entity;
    }

    @Override
    protected void mapSpecificFields(UserHistoryDTO source, UserHistory destination) {
        // Не требуется
    }

    @Override
    protected void mapSpecificFields(UserHistory source, UserHistoryDTO destination) {
        // Не требуется
    }

    @Override
    protected List<Long> getIds(UserHistory entity) {
        return Collections.singletonList(entity.getId());
    }
}