package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

// manages Product entities
@Repository // automatically detected and configured by Spring Data JPA
public interface IProductRepository extends JpaRepository<Product, Long> {
    // provides CRUD operations for Product entity

    // get products based on search and filter criteria
    @Query("SELECT p FROM Product p WHERE " +
            "(:search is null or lower(p.name) like %:search% or lower(p.description) like %:search%) " +
            "AND (:condition is null or lower(p.condition) = lower(:condition)) " +
            "AND (:minPrice is null or p.price >= :minPrice) " +
            "AND (:maxPrice is null or p.price <= :maxPrice)")
    List<Product> findAllProductsWithSearchAndFilter(@Param("search") String search,
                                                     @Param("condition") String condition,
                                                     @Param("minPrice") Double minPrice,
                                                     @Param("maxPrice") Double maxPrice,
                                                     Sort sort);
}
