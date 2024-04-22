package RDP.Bazaar.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

// represents product
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="product")
public class Product {
    // primary key for Product entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="productid")
    private Long productid;

    private String name;
    private String description;
    private double price;
    private String category;
    private String productCondition;
    private String imgurl;
    private Date datePosted;
    private Long sellerid;

    // additional property for insights
    private int clicks;
}
