package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// manages Product entities
@Repository // automatically detected and configured by Spring Data JPA
public interface IProductRepository extends JpaRepository<Product, Long> {
    // provides CRUD operations for Product entity

    // get all products with search and filter
    List<Product> findAllProductsWithSearchAndFilter(Specification<Product> spec, Sort sort);
}
