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


    // increment number of clicks for specific product
    public void incrementClicks(Long productId) {
        productRepository.incrementClicks(productId);
    }

    // count total number of products that belong to a specific user
    public int countProductsByUserId(Long sellerid) {
        //return productRepository.countByUserUserId(userId);
        return productRepository.countBySellerid(sellerid);
    }

    // get total number of clicks per products for a specific user
    public List<Object[]> getClicksPerProductForUser(Long userId) {
        return productRepository.getClicksPerProductForUser(userId);
    }

    // get total number of clicks for all products that belong to a specific user
    public Integer getTotalClicksForUser(Long userId) {
        return productRepository.getTotalClicksForUser(userId);
    }

    // get total number of clicks per product category
    public List<Object[]> getTotalClicksByCategory() {
        return productRepository.getTotalClicksByCategory();
    }

    // get products based on search and filter criteria
    public List<Product> searchAndFilterProducts(
            String search, String category, String productCondition, Double minPrice, Double maxPrice, String sortBy) {

        // find products based on search and filter criteria using specifications
        List<Product> products = productRepository.findAll(
                ProductSpecifications.searchAndFilterProducts(search, category, productCondition, minPrice, maxPrice)
        );

        // remove user information from each product
//        products.forEach(product -> product.setUser(null));

        // sort products based on provided sortBy parameter
        if ("priceAsc".equals(sortBy)) {
            products.sort(Comparator.comparing(Product::getPrice));
        } else if ("priceDesc".equals(sortBy)) {
            products.sort(Comparator.comparing(Product::getPrice).reversed());
        } else if ("datePostedAsc".equals(sortBy)) {
            products.sort(Comparator.comparing(Product::getDatePosted));
        } else if ("datePostedDesc".equals(sortBy)) {
            products.sort(Comparator.comparing(Product::getDatePosted).reversed());
        }

        return products;
    }
}
