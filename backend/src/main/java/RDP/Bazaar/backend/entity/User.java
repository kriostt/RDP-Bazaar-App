package RDP.Bazaar.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// represents user
@Entity // annotated as Entity for database persistence
@Data // automatically generates getters and setters
@NoArgsConstructor // automatically generates no argument constructor
@AllArgsConstructor // automatically generates all arguments constructor
public class User {
    // primary key for User entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
}
