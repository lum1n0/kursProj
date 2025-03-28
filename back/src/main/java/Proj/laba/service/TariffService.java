package Proj.laba.service;

import Proj.laba.dto.TariffDTO;
import Proj.laba.mapper.TariffMapper;
import Proj.laba.model.Tariff;
import Proj.laba.reposirory.TariffRepository;
import org.springframework.stereotype.Service;

@Service
public class TariffService extends GenericService<Tariff, TariffDTO> {

    public TariffService(TariffRepository repository, TariffMapper mapper) {
        super(repository, mapper);
    }
}