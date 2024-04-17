package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    // automatic injection of ProductService instance
    @Autowired
    private ProductService productService;

    // API endpoint for getting all products
    @GetMapping("/")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // API endpoint to increment click count of specific product
    @PostMapping("/incrementClicks/{productId}")
    public void incrementClicks(@PathVariable Long productId) {
        productService.incrementClicks(productId);
    }

    // API endpoint to count total number of products that belong to specific user
    @GetMapping("/productCount/{userId}")
    public int countProductsByUserId(@PathVariable Long userId) {
        return productService.countProductsByUserId(userId);
    }

    // API endpoint to get number of clicks per product for specific user
    @GetMapping("/clicksPerProduct/{userId}")
    public List<Object[]> getClicksPerProductForUser(@PathVariable Long userId) {
        return productService.getClicksPerProductForUser(userId);
    }

    // API endpoint to get total number of clicks per date for all products that belong to specific user
    @GetMapping("/totalClicksPerDate/{userId}")
    public List<Object[]> getTotalClicksPerDateForUser(@PathVariable Long userId) {
        return productService.getTotalClicksPerDateForUser(userId);

    }
    
    // API endpoint for searching and filtering products
    @GetMapping("/searchAndFilter")
    public List<Product> searchAndFilterProducts(@RequestParam(required = false) String search,
                                                 @RequestParam(required = false) String category,
                                                 @RequestParam(required = false) String productCondition,
                                                 @RequestParam(required = false) Double minPrice,
                                                 @RequestParam(required = false) Double maxPrice,
                                                 @RequestParam(required = false) String sortBy) {
        return productService.searchAndFilterProducts(search, category, productCondition, minPrice, maxPrice, sortBy);
    }
}
