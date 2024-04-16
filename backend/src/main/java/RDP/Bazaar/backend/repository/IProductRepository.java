package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

// manages Product entities
@Repository // automatically detected and configured by Spring Data JPA
public interface IProductRepository extends JpaRepository<Product, Long> {
    // JpaRepository<Product, Long> provides CRUD operations for Product entity

    // increment the clicks of a product
    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.clicks = p.clicks + 1 WHERE p.productId = :productId")
    void incrementClicks(Long productId);

    // get the total number of products that belong to a user
    int countByUserUserId(Long userId);

    // get the number of clicks for each product owned by a user
    @Query("SELECT p, SUM(p.clicks) FROM Product p WHERE p.user.userId = :userId GROUP BY p")
    List<Object[]> getClicksPerProductForUser(Long userId);

    // get the overall number of clicks per date for all products that belong to a user
    @Query("SELECT SUM(p.clicks), p.datePosted FROM Product p WHERE p.user.userId = :userId GROUP BY p.datePosted")
    List<Object[]> getTotalClicksPerDateForUser(Long userId);
}
