package Proj.laba.controller.rest;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Proj.laba.dto.GenericDTO;
import Proj.laba.model.GenericModel;
import Proj.laba.service.GenericService;

import java.util.List;

@RestController
@Slf4j
public abstract class GenericController<E extends GenericModel, D extends GenericDTO> {
    protected GenericService<E, D> service;

    protected GenericController(GenericService<E, D> genericService) {
        this.service = genericService;
    }

    @Operation(description = "Получить запись по Id", method = "getOneById")
    @GetMapping("/{id}")
    public ResponseEntity<D> getOneById(@PathVariable("id") @Min(value = 1, message = "ID должен быть больше 0") Long id) {
        log.info("Получен запрос на поиск записи с id: {}", id);
        D response = service.getOne(id);
        log.info("Запись с id: {} успешно найдена", id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Operation(description = "Получить все записи", method = "getAll")
    @GetMapping
    public ResponseEntity<List<D>> getAll() {
        log.info("Получен запрос на поиск всех записей");
        List<D> response = service.listAll();
        log.info("Найдено {} записей", response.size());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Operation(description = "Создать запись", method = "add")
    @PostMapping
    public ResponseEntity<D> create(@Valid @RequestBody D newEntity) {
        log.info("Получен запрос на создание новой записи");
        D response = service.create(newEntity);
        log.info("Запись успешно создана с id: {}", response.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(description = "Обновить запись", method = "update")
    @PutMapping("/{id}")
    public ResponseEntity<D> update(@PathVariable("id") @Min(value = 1, message = "ID должен быть больше 0") Long id, 
                                    @Valid @RequestBody D updateEntity) {
        log.info("Получен запрос на обновление записи с id: {}", id);
        updateEntity.setId(id);
        D response = service.update(updateEntity);
        log.info("Запись с id: {} успешно обновлена", id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @Operation(description = "Удалить запись", method = "delete")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") @Min(value = 1, message = "ID должен быть больше 0") Long id) {
        log.info("Получен запрос на удаление записи с id: {}", id);
        service.delete(id);
        log.info("Запись с id: {} успешно удалена", id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}