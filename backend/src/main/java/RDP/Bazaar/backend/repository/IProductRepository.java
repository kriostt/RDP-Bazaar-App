package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

// manages Product entities
@Repository // automatically detected and configured by Spring Data JPA
public interface IProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    // JpaRepository<Product, Long> provides CRUD operations for Product entity

    // JpaSpecificationExecutor allows execution of dynamic queries using Specifications

    @Query("SELECT p FROM Product p WHERE p.sellerid = :sellerid")
    List<Product> findBySellerId(Long sellerid);

    @Query("SELECT p FROM Product p WHERE p.productid = :productid")
    List<Product> findProductByProductid(Long productid);
}
