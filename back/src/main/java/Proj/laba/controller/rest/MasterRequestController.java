package Proj.laba.controller.rest;

import Proj.laba.dto.MasterRequestDTO;
import Proj.laba.model.MasterRequest;
import Proj.laba.service.MasterRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/master-requests")
@Tag(name = "Заявки на вызов мастера", description = "Контроллер для работы с заявками на вызов мастера")
public class MasterRequestController extends GenericController<MasterRequest, MasterRequestDTO> {

    private final MasterRequestService masterRequestService;

    public MasterRequestController(MasterRequestService masterRequestService) {
        super(masterRequestService);
        this.masterRequestService = masterRequestService;
    }

    @Override
    @Operation(summary = "Создать заявку на вызов мастера")
    @PostMapping
    public ResponseEntity<MasterRequestDTO> create(@RequestBody MasterRequestDTO masterRequestDTO) {
        MasterRequestDTO createdRequest = masterRequestService.create(masterRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
    }

    @Operation(summary = "Получить все заявки для мастера")
    @GetMapping("/all")
    @PreAuthorize("hasRole('MASTER')")
    public ResponseEntity<List<MasterRequestDTO>> getAllMasterRequests() {
        List<MasterRequestDTO> requests = masterRequestService.findAllMasterRequests();
        return ResponseEntity.ok(requests);
    }

    @Operation(summary = "Обновить статус заявки (для мастера)")
    @PutMapping("/status/{id}")
    @PreAuthorize("hasRole('MASTER')")
    public ResponseEntity<MasterRequestDTO> updateRequestStatus(@PathVariable Long id, @RequestBody String status) {
        MasterRequestDTO updatedRequest = masterRequestService.updateStatus(id, status);
        return ResponseEntity.ok(updatedRequest);
    }

    @Operation(summary = "Получить заявки пользователя")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MasterRequestDTO>> getUserRequests(@PathVariable Long userId) {
        List<MasterRequestDTO> requests = masterRequestService.findByUserId(userId);
        return ResponseEntity.ok(requests);
    }
}