package Proj.laba.mapper;

import Proj.laba.dto.MasterRequestDTO;
import Proj.laba.model.MasterRequest;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;

@Component
public class MasterRequestMapper extends GenericMapper<MasterRequest, MasterRequestDTO> {

    @Autowired
    public MasterRequestMapper(@Qualifier("autoModelMapper") ModelMapper modelMapper) {
        super(MasterRequest.class, MasterRequestDTO.class, modelMapper);
    }

    @PostConstruct
    protected void setupMapper() {
        // Создаем пустой TypeMap для MasterRequest -> MasterRequestDTO
        TypeMap<MasterRequest, MasterRequestDTO> requestToDtoMap = modelMapper.createTypeMap(MasterRequest.class, MasterRequestDTO.class, "masterRequestToMasterRequestDTO");
        requestToDtoMap.addMappings(mapper -> {
            // Общие поля из GenericModel в GenericDTO
            mapper.map(MasterRequest::getId, MasterRequestDTO::setId);
            mapper.map(MasterRequest::getCreatedBy, MasterRequestDTO::setCreatedBy);
            mapper.map(MasterRequest::getCreateWhen, MasterRequestDTO::setCreatedWhen);
            mapper.map(MasterRequest::getDeletedWhen, MasterRequestDTO::setDeletedWhen);
            mapper.map(MasterRequest::getDeletedBy, MasterRequestDTO::setDeletedBy);
            mapper.map(MasterRequest::isDeleted, MasterRequestDTO::setDeleted);
            // Специфические поля для user
            mapper.map(src -> src.getUser().getId(), MasterRequestDTO::setUserId);
            mapper.map(src -> src.getUser().getFirstName(), MasterRequestDTO::setUserFirstName);
            mapper.map(src -> src.getUser().getPhone(), MasterRequestDTO::setUserPhone);
        });

        // Создаем пустой TypeMap для MasterRequestDTO -> MasterRequest
        TypeMap<MasterRequestDTO, MasterRequest> dtoToRequestMap = modelMapper.createTypeMap(MasterRequestDTO.class, MasterRequest.class, "masterRequestDTOToMasterRequest");
        dtoToRequestMap.addMappings(mapper -> {
            // Общие поля из GenericDTO в GenericModel
            mapper.map(MasterRequestDTO::getId, MasterRequest::setId);
            mapper.map(MasterRequestDTO::getCreatedBy, MasterRequest::setCreatedBy);
            mapper.map(MasterRequestDTO::getCreatedWhen, MasterRequest::setCreateWhen);
            mapper.map(MasterRequestDTO::getDeletedWhen, MasterRequest::setDeletedWhen);
            mapper.map(MasterRequestDTO::getDeletedBy, MasterRequest::setDeletedBy);
            mapper.map(MasterRequestDTO::isDeleted, MasterRequest::setDeleted);
        });
    }

    @Override
    protected void mapSpecificFields(MasterRequestDTO source, MasterRequest destination) {
        // Нет необходимости устанавливать поле user в этом методе
    }

    @Override
    protected void mapSpecificFields(MasterRequest source, MasterRequestDTO destination) {
        // Нет специфических полей для маппинга
    }

    @Override
    protected List<Long> getIds(MasterRequest entity) {
        return Collections.singletonList(entity.getId());
    }
}