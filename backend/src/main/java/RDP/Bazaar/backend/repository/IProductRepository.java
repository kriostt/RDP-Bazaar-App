package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

// manages Product entities
@Repository // automatically detected and configured by Spring Data JPA
public interface IProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    // JpaRepository<Product, Long> provides CRUD operations for Product entity

    // JpaSpecificationExecutor allows execution of dynamic queries using Specifications

    // increment the clicks of a product
    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.clicks = p.clicks + 1 WHERE p.productId = :productId")
    void incrementClicks(Long productId);

    // get the total number of products that belong to a user
    int countByUserUserId(Long userId);

    // get the number of clicks for each product owned by a user
    @Query("SELECT p.productId, p.name, SUM(p.clicks) FROM Product p WHERE p.user.userId = :userId GROUP BY p.productId, p.name")
    List<Object[]> getClicksPerProductForUser(Long userId);

    // get the total number of clicks for all products that belong to a user
    @Query("SELECT SUM(p.clicks) FROM Product p WHERE p.user.userId = :userId")
    Integer getTotalClicksForUser(Long userId);
}
