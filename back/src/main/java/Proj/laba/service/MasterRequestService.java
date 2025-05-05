package Proj.laba.service;

import Proj.laba.dto.MasterRequestDTO;
import Proj.laba.mapper.MasterRequestMapper;
import Proj.laba.model.MasterRequest;
import Proj.laba.reposirory.GenericRepository;
import Proj.laba.reposirory.MasterRequestRepository;
import Proj.laba.reposirory.UserRepository;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MasterRequestService extends GenericService<MasterRequest, MasterRequestDTO> {

    private final UserRepository userRepository;
    private final MasterRequestRepository masterRequestRepository;
    private final MasterRequestMapper masterRequestMapper;

    public MasterRequestService(GenericRepository<MasterRequest> repository,
                                MasterRequestMapper masterRequestMapper,
                                UserRepository userRepository,
                                MasterRequestRepository masterRequestRepository) {
        super(repository, masterRequestMapper);
        this.userRepository = userRepository;
        this.masterRequestRepository = masterRequestRepository;
        this.masterRequestMapper = masterRequestMapper;
    }

    @Override
    public MasterRequestDTO create(MasterRequestDTO newObject) {
        MasterRequest request = masterRequestMapper.toEntity(newObject);
        request.setUser(userRepository.findById(newObject.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found")));
        request.setStatus("на рассмотрении");
        MasterRequest savedRequest = repository.save(request);
        return masterRequestMapper.toDTO(savedRequest);
    }

    public List<MasterRequestDTO> findAllMasterRequests() {
        return masterRequestRepository.findByRequestType("MASTER").stream()
                .map(masterRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    public MasterRequestDTO updateStatus(Long id, String status) {
        MasterRequest request = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("MasterRequest not found"));
        request.setStatus(status);
        MasterRequest updatedRequest = repository.save(request);
        return masterRequestMapper.toDTO(updatedRequest);
    }

    public List<MasterRequestDTO> findByUserId(Long userId) {
        return masterRequestRepository.findByUserId(userId).stream()
                .map(masterRequestMapper::toDTO)
                .collect(Collectors.toList());
    }
}