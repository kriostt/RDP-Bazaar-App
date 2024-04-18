package RDP.Bazaar.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="sellercatalog")
public class SellerCatalogue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long catalogId;
    private String userRater;
    private String userRated;
    private String rating;
    private String review;
}
