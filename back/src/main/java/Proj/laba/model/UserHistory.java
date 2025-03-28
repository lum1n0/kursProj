package Proj.laba.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user_history")
public class UserHistory extends GenericModel{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "field_name")
    private String fieldName;

    @Column(name = "old_value")
    private String oldValue;

    @Column(name = "new_value")
    private String newValue;

    @Column(name = "changed_by")
    private String changedBy;

    @Column(name = "changed_when")
    private LocalDateTime changedWhen;

    // Добавляем конструктор
    public UserHistory() {
    }

    public UserHistory(Long id, User user, String fieldName, String oldValue, String newValue, String changedBy, LocalDateTime changedWhen) {
        this.id = id;
        this.user = user;
        this.fieldName = fieldName;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.changedBy = changedBy;
        this.changedWhen = changedWhen;
    }
}