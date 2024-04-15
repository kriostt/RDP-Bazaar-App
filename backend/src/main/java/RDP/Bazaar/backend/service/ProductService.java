package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

// handles business logic related to Product entities
@Service
public class ProductService {
    // automatic injection of IProductRepository instance
    @Autowired
    private IProductRepository productRepository;

    // get products based on search and filter criteria
    public List<Product> searchAndFilterProducts(String search, String condition, Double minPrice, Double maxPrice, String sortBy) {
        // used to dynamically build query predicates based on provided search and filter criteria
        Specification<Product> spec = Specification.where(null);

        // if search is provided, get products with name or description like in provided search query
        if (search != null && !search.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("description")), "%" + search.toLowerCase() + "%")
            ));
        }

        // if condition is provided, get products of provided condition
        if (condition != null && !condition.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(cb.lower(root.get("condtion")), condition.toLowerCase()));
        }

        // if minPrice is provided, get products with price >= provided minPrice
        if (minPrice != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        // if maxPrice is provided, get products with price <= provided maxPrice
        if (maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        // if sortBy is provided, get products using the repository method and apply sorting based on provided sortBy
        if (sortBy != null && !sortBy.isEmpty()) {
            switch (sortBy) {
                case "priceAsc":
                    return productRepository.findAllProductsWithSearchAndFilter(spec, Sort.by(Sort.Direction.ASC, "price"));
                case "priceDesc":
                    return productRepository.findAllProductsWithSearchAndFilter(spec, Sort.by(Sort.Direction.DESC, "price"));
                case "datePostedAsc":
                    return productRepository.findAllProductsWithSearchAndFilter(spec, Sort.by(Sort.Direction.ASC, "datePosted"));
                case "datePostedDesc":
                    return productRepository.findAllProductsWithSearchAndFilter(spec, Sort.by(Sort.Direction.DESC, "datePosted"));
                default:
                    break;
            }
        }

        // if no sorting specified, get products without sorting
        return productRepository.findAllProductsWithSearchAndFilter(spec, null);
    }
}
