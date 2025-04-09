package Proj.laba.service;

import Proj.laba.dto.RoleDTO;
import Proj.laba.mapper.GenericMapper;
import Proj.laba.model.Role;
import Proj.laba.reposirory.GenericRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleService extends GenericService<Role, RoleDTO> {
    public RoleService(GenericRepository<Role> repository,
                       GenericMapper<Role, RoleDTO> mapper) {
        super(repository, mapper);
    }

    @Override
    @Transactional
    public void delete(final Long id) {
        // При удалении роли все связанные пользователи будут удалены автоматически
        // благодаря CascadeType.ALL
        repository.deleteById(id);
    }
}
