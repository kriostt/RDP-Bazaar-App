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
        // call the repository method
        return productRepository.findAllProductsWithSearchAndFilter(search, condition, minPrice, maxPrice, applySort(sortBy));
    }

    // apply the sorting filter
    private Sort applySort(String sortBy) {
        // if sortBy is provided, return the desired order
        if (sortBy != null && !sortBy.isEmpty()) {
            switch (sortBy) {
                case "priceAsc":
                    return Sort.by(Sort.Direction.ASC, "price");
                case "priceDesc":
                    return Sort.by(Sort.Direction.DESC, "price");
                case "datePostedAsc":
                    return Sort.by(Sort.Direction.ASC, "datePosted");
                case "datePostedDesc":
                    return Sort.by(Sort.Direction.DESC, "datePosted");
                default:
                    break;
            }
        }
        return null;
    }
}
