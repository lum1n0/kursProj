package Proj.laba.service;

import Proj.laba.dto.UserHistoryDTO;
import Proj.laba.mapper.UserHistoryMapper;
import Proj.laba.model.UserHistory;
import Proj.laba.reposirory.UserHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserHistoryService extends GenericService<UserHistory, UserHistoryDTO> {

    private final UserHistoryRepository repository;

    public UserHistoryService(UserHistoryRepository repository, UserHistoryMapper mapper) {
        super(repository, mapper);
        this.repository = repository;
    }

    public List<UserHistoryDTO> findByUserId(Long userId) {
        return mapper.toDTOs(repository.findByUserId(userId));
    }
}