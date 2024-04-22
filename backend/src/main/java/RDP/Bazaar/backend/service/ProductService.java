package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.entity.User;
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
        //products.forEach(product -> product.setUser(null));
        return products;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product saveItem(Product product) {
        return productRepository.save(product); // Save the user using the repository
    }

    public Product updateItem(Product product) {
        // Retrieve the existing product from the database by productid
        Long productId = product.getProductid();
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        // Update the existing product with new data
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setProductCondition(product.getProductCondition());
        existingProduct.setImgurl(product.getImgurl());
        existingProduct.setDatePosted(product.getDatePosted());
        existingProduct.setClicks(product.getClicks());
//        existingProduct.setUser(product.getUser());

        // Save the updated product
        return productRepository.save(existingProduct);
    }

    // Method to get a product by ID
    public Product getProductById(Long productId) {
        return productRepository.findAll().stream()
                .filter(product -> Long.valueOf(product.getProductid()).equals(productId))
                .findFirst()
                .orElse(null);
    }
}
