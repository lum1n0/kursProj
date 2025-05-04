package Proj.laba.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "master_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "default_generator", sequenceName = "master_requests_seq", allocationSize = 1)
public class MasterRequest extends GenericModel {

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "preferred_time", nullable = false)
    private LocalDateTime preferredTime;

    @Column(name = "status", nullable = false)
    private String status; // "на рассмотрении", "выехал", "решил", "отклонено"

    @Column(name = "request_type", nullable = false)
    private String requestType; // "MASTER" или "ADMIN"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}