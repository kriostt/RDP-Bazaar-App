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

    // get all products
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();

        // remove user information from each product (PLACEHOLDER FOR HOW PRODUCT CATALOGUE FEATURE HANDLES THIS)
        products.forEach(product -> product.setUser(null));
        return products;
    }

    // increment number of clicks for specific product
    public void incrementClicks(Long productId) {
        productRepository.incrementClicks(productId);
    }

    // count total number of products that belong to a specific user
    public int countProductsByUserId(Long userId) {
        return productRepository.countByUserUserId(userId);
    }

    // get number of clicks per products for a specific user
    public List<Object[]> getClicksPerProductForUser(Long userId) {
        return productRepository.getClicksPerProductForUser(userId);
    }

    // get total number of clicks per date for all products that belong to a specific user
    public List<Object[]> getTotalClicksPerDateForUser(Long userId) {
        return productRepository.getTotalClicksPerDateForUser(userId);
    }
}
