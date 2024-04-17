package RDP.Bazaar.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity // Indicates that this class is an entity and will be mapped to a database table
@Data // Generates getter and setter methods
@NoArgsConstructor // Generates a no-argument constructor
@AllArgsConstructor // Generates a constructor with all arguments
public class User {
    @Id // Indicates the primary key of the entity
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the user
    private String username; // Username of the user
    private String firstName; // First Name of the user
    private String lastName; // Last Name of the user
    private String phone; // Phone number of the user
    private String email; // Email address of the user
    private String password; // Password of the user
}
