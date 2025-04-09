package Proj.laba.reposirory;

import Proj.laba.model.User;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends GenericRepository<User> {
    Optional<User> findByLogin(String login);
    List<User> findByLastName(String lastName);
    Optional<User> findById(Long id);
    void deleteById(Long id);
    List<User> findAll();
    Optional<User> findByEmail(String email);

}
