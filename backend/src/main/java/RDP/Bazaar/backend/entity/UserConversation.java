package RDP.Bazaar.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserConversation {
    @Id
    private long convoId;

    @Column(length = 1000)
    private String message;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "senderUserId")
    private User senderUser;

    @ManyToOne
    @JoinColumn(name = "receiverUserId")
    private User receiverUser;

}
