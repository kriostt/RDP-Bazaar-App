package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.repository.IProductRepository;
import RDP.Bazaar.backend.repository.ProductSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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

    // Method to get a product by ID
    public Product getProductById(Long productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        Product product = productOptional.orElse(null);
        if (product != null) {
            // Set the seller as null
            product.setUser(null);
        }
        return product;
    }
}
