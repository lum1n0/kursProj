package Proj.laba.controller.rest;

import Proj.laba.dto.UserHistoryDTO;
import Proj.laba.model.UserHistory;
import Proj.laba.service.UserHistoryService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-history")
@PreAuthorize("hasRole('ADMIN')")
public class UserHistoryController extends GenericController<UserHistory, UserHistoryDTO> {
    private final UserHistoryService service;

    public UserHistoryController(UserHistoryService service) {
        super(service);
        this.service = service;
    }

    @GetMapping("/by-user/{userId}")
    public List<UserHistoryDTO> findByUserId(@PathVariable Long userId) {
        System.out.println("Вызван findByUserId для userId: " + userId);
        return service.findByUserId(userId);
    }
}