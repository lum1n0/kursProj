package Proj.laba.reposirory;

import Proj.laba.model.UserHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserHistoryRepository extends GenericRepository<UserHistory> {
    @Query("SELECT uh FROM UserHistory uh WHERE uh.user.id = :userId")
    List<UserHistory> findByUserId(Long userId);
}