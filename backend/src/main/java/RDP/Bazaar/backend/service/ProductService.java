package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// handles business logic related to Product entities
@Service
public class ProductService {
    // automatic injection of IProductRepository instance
    @Autowired
    private IProductRepository productRepository;

    // search products by name of description
    public List<Product> search(String search) {
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search);
    }

    // filter products by condition
    public List<Product> filterByCondition(String condition) {
        return productRepository.findByConditionIgnoreCase(condition);
    }

    // filter products by price range
    public List<Product> filterByPriceRange(double minPrice, double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    // get all products sorted by price in ascending order
    public List<Product> getAllProductsSortedByPriceAscending() {
        return productRepository.findAllByOrderByPriceAsc();
    }

    // get all products sorted by price in descending order
    public List<Product> getAllProductsSortedByPriceDescending() {
        return productRepository.findAllByOrderByPriceDesc();
    }

    // get all products sorted by date posted in ascending order
    public List<Product> getAllProductsSortedByDatePostedAscending() {
        return productRepository.findAllByOrderByDatePostedAsc();
    }

    // get all products sorted by date posted in descending order
    public List<Product> getAllProductsSortedByDatePostedDescending() {
        return productRepository.findAllByOrderByDatePostedDesc();
    }
}
