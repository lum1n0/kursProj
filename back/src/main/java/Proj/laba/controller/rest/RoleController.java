package Proj.laba.controller.rest;

import Proj.laba.dto.RoleDTO;
import Proj.laba.model.Role;
import Proj.laba.service.RoleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roles")
@Tag(name = "Роли",description = "Контроллер для работы с ролями компании")
public class RoleController extends GenericController<Role, RoleDTO> {

    public RoleController(RoleService roleService) {
        super(roleService);
    }
}
