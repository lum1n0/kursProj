package Proj.laba.mapper;

import Proj.laba.dto.GenericDTO;
import Proj.laba.model.GenericModel;
import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public abstract class GenericMapper<E extends GenericModel, D extends GenericDTO> {

    protected final ModelMapper modelMapper;
    private final Class<E> entityClass;
    private final Class<D> dtoClass;

    protected GenericMapper(Class<E> entityClass, Class<D> dtoClass, ModelMapper modelMapper) {
        this.entityClass = entityClass;
        this.dtoClass = dtoClass;
        this.modelMapper = modelMapper;
    }

    @PostConstruct
    protected void setupMapper() {
        // Создаём TypeMap для маппинга из сущности в DTO
        TypeMap<E, D> entityToDtoMap = modelMapper.getTypeMap(entityClass, dtoClass);
        if (entityToDtoMap == null) {
            entityToDtoMap = modelMapper.createTypeMap(entityClass, dtoClass);
        }
        // Маппинг общих полей из GenericModel в GenericDTO
        entityToDtoMap.addMappings(mapper -> {
            mapper.map(GenericModel::getId, GenericDTO::setId);
            mapper.map(GenericModel::getCreatedBy, GenericDTO::setCreatedBy);
            mapper.map(GenericModel::getCreateWhen, GenericDTO::setCreatedWhen);
            mapper.map(GenericModel::getDeletedWhen, GenericDTO::setDeletedWhen);
            mapper.map(GenericModel::getDeletedBy, GenericDTO::setDeletedBy);
            mapper.map(GenericModel::isDeleted, GenericDTO::setDeleted);
        });

        // Создаём TypeMap для маппинга из DTO в сущность
        TypeMap<D, E> dtoToEntityMap = modelMapper.getTypeMap(dtoClass, entityClass);
        if (dtoToEntityMap == null) {
            dtoToEntityMap = modelMapper.createTypeMap(dtoClass, entityClass);
        }
        // Маппинг общих полей из GenericDTO в GenericModel
        dtoToEntityMap.addMappings(mapper -> {
            mapper.map(GenericDTO::getId, GenericModel::setId);
            mapper.map(GenericDTO::getCreatedBy, GenericModel::setCreatedBy);
            mapper.map(GenericDTO::getCreatedWhen, GenericModel::setCreateWhen);
            mapper.map(GenericDTO::getDeletedWhen, GenericModel::setDeletedWhen);
            mapper.map(GenericDTO::getDeletedBy, GenericModel::setDeletedBy);
            mapper.map(GenericDTO::isDeleted, GenericModel::setDeleted);
        });
    }

    public E toEntity(D dto) {
        return Objects.isNull(dto)
                ? null
                : modelMapper.map(dto, entityClass);
    }

    public D toDTO(E entity) {
        return Objects.isNull(entity)
                ? null
                : modelMapper.map(entity, dtoClass);
    }

    public List<D> toDTOs(List<E> entities) {
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<E> toEntities(List<D> dtos) {
        return dtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    protected abstract void mapSpecificFields(D source, E destination);

    protected abstract void mapSpecificFields(E source, D destination);

    protected abstract List<Long> getIds(E entity);
}