package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
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
    @Query("UPDATE Product p SET p.clicks = p.clicks + 1 WHERE p.productid = :productid")
    void incrementClicks(Long productid);

    // get the total number of products that belong to a user
//    int countByUserUserId(Long sellerid);
    

    // get the total number of clicks for each product owned by a user
    //@Query("SELECT p.productid, p.name, SUM(p.clicks) FROM Product p WHERE p.user.userId = :userId GROUP BY p.productid, p.name")
    @Query("SELECT p.productid, p.name, SUM(p.clicks) FROM Product p WHERE p.sellerid = :sellerid GROUP BY p.productid, p.name")
    List<Object[]> getClicksPerProductForUser(Long sellerid);

    // get the total number of clicks for all products that belong to a user
    //@Query("SELECT SUM(p.clicks) FROM Product p WHERE p.user.userId = :userId")
    @Query("SELECT SUM(p.clicks) FROM Product p WHERE p.sellerid = :sellerid")
    Integer getTotalClicksForUser(Long sellerid);

    // get the total number of clicks for each product category
    @Query("SELECT p.category, SUM(p.clicks) FROM Product p GROUP BY p.category")
    List<Object[]> getTotalClicksByCategory();


    int countBySellerid(Long sellerid);
}
