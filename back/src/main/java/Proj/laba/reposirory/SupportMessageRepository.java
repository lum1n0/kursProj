package Proj.laba.reposirory;

import Proj.laba.model.SupportMessage;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportMessageRepository extends GenericRepository<SupportMessage> {
    List<SupportMessage> findByIsAnsweredFalse();
}