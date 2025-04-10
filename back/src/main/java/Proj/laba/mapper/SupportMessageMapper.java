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
    protected void mapSpecificFields(SupportMessageDTO source, SupportMessage destination) {
        destination.setUserId(source.getUserId());
        destination.setMessage(source.getMessage());
        destination.setAnswered(source.isAnswered());
    }

    @Override
    protected void mapSpecificFields(SupportMessage source, SupportMessageDTO destination) {
        // Дополнительное маппинг, если нужно
    }

    @Override
    protected List<Long> getIds(SupportMessage entity) {
        return List.of(entity.getId());
    }
}