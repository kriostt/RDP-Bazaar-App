package RDP.Bazaar.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class SellerCatalogue {

    @Id
    private long catalogId;
    private String userRater;
    private String userRated;
    private String rating;
    private String review;
}
