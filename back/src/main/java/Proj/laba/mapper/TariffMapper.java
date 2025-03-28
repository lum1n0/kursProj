package Proj.laba.mapper;

import Proj.laba.dto.TariffDTO;
import Proj.laba.model.Tariff;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class TariffMapper extends GenericMapper<Tariff, TariffDTO> {

    public TariffMapper(ModelMapper modelMapper) {
        super(Tariff.class, TariffDTO.class, modelMapper);
    }

    @Override
    protected void setupMapper() {
        // Настройка маппинга, если потребуется
    }

    @Override
    protected void mapSpecificFields(TariffDTO source, Tariff destination) {}

    @Override
    protected void mapSpecificFields(Tariff source, TariffDTO destination) {}

    @Override
    protected List<Long> getIds(Tariff entity) {
        return Collections.singletonList(entity.getId());
    }
}