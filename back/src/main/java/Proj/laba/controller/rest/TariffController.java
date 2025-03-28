package Proj.laba.controller.rest;

import Proj.laba.dto.TariffDTO;
import Proj.laba.model.Tariff;
import Proj.laba.service.TariffService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tariffs")
public class TariffController extends GenericController<Tariff, TariffDTO> {

    public TariffController(TariffService service) {
        super(service);
    }
}