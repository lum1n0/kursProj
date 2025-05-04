package Proj.laba.reposirory;

import Proj.laba.model.MasterRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MasterRequestRepository extends GenericRepository<MasterRequest> {
    List<MasterRequest> findByUserId(Long userId);
    List<MasterRequest> findByRequestType(String requestType);
}