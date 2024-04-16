package RDP.Bazaar.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

// represents product
@Entity // annotated as Entity for database persistence
@Data // automatically generates getters and setters
@NoArgsConstructor // automatically generates no argument constructor
@AllArgsConstructor // automatically generates all arguments constructor
public class Product {
    // primary key for Product entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;

    private String name;
    private String description;
    private double price;
    private String category;
    private String productCondition;

    private Date datePosted;

    // additional property for insights
    private int clicks;

    // establish relationship with User entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
}