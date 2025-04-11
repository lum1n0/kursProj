package Proj.laba.mapper;

import Proj.laba.dto.SupportMessageDTO;
import Proj.laba.model.SupportMessage;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SupportMessageMapper extends GenericMapper<SupportMessage, SupportMessageDTO> {

    public SupportMessageMapper(ModelMapper modelMapper) {
        super(SupportMessage.class, SupportMessageDTO.class, modelMapper);
    }

    @Override
    public SupportMessage toEntity(SupportMessageDTO dto) {
        if (dto == null) {
            return null;
        }
        SupportMessage message = new SupportMessage();
        mapSpecificFields(dto, message); // Ручное копирование полей
        return message;
    }

    @Override
    public SupportMessageDTO toDTO(SupportMessage entity) {
        if (entity == null) {
            return null;
        }
        SupportMessageDTO dto = new SupportMessageDTO();
        mapSpecificFields(entity, dto); // Ручное копирование полей
        return dto;
    }

    @Override
    protected void mapSpecificFields(SupportMessageDTO source, SupportMessage destination) {
        destination.setUserId(source.getUserId());
        destination.setMessage(source.getMessage());
        destination.setAnswered(source.isAnswered());
    }

    @Override
    protected void mapSpecificFields(SupportMessage source, SupportMessageDTO destination) {
        destination.setId(source.getId()); // Копируем id
        destination.setUserId(source.getUserId());
        destination.setMessage(source.getMessage());
        destination.setAnswered(source.isAnswered());
    }

    @Override
    protected List<Long> getIds(SupportMessage entity) {
        return List.of(entity.getId());
    }
}