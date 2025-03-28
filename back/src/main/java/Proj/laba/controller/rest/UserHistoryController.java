package Proj.laba.controller.rest;

import Proj.laba.dto.UserHistoryDTO;
import Proj.laba.model.UserHistory;
import Proj.laba.service.UserHistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-history")
public class UserHistoryController extends GenericController<UserHistory, UserHistoryDTO> {

    private final UserHistoryService service;

    public UserHistoryController(UserHistoryService service) {
        super(service);
        this.service = service;
    }

    @GetMapping("/by-user/{userId}")
    public List<UserHistoryDTO> findByUserId(@PathVariable Long userId) {
        return service.findByUserId(userId);
    }
}