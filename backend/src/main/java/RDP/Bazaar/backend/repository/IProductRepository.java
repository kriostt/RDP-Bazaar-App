package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// manages Product entities
@Repository // automatically detected and configured by Spring Data JPA
public interface IProductRepository extends JpaRepository<Product, Long> {
    // provides CRUD operations for Product entity

    // search products by name or description
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);

    // filter products by condition
    List<Product> findByConditionIgnoreCase(String condition);

    // filter products by price range
    List<Product> findByPriceBetween(double minPrice, double maxPrice);

    // get all products sorted by price in ascending order
    List<Product> findAllByOrderByPriceAsc();

    // get all products sorted by price in descending order
    List<Product> findAllByOrderByPriceDesc();

    // get all products sorted by date posted in ascending order
    List<Product> findAllByOrderByDatePostedAsc();

    // get all products sorted by date posted in descending order
    List<Product> findAllByOrderByDatePostedDesc();
}
