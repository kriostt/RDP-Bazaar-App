package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.service.ProductService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
   @PostMapping("/")
   public ResponseEntity<Product> createProduct(@ModelAttribute Product product) {
        try {
            Product addedProduct = productService.addProduct(product);
            return new ResponseEntity<>(addedProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
   }
    // API endpoint to get a product by ID
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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

    // API endpoint to get total number of clicks for all products that belong to specific user
    @GetMapping("/totalClicks/{userId}")
    public Integer getTotalClicksForUser(@PathVariable Long userId) {
        return productService.getTotalClicksForUser(userId);
    }

    // API endpoint to get total number of clicks per product category
    @GetMapping("/totalClicksPerCategory")
    public List<Object[]> getClicksPerCategory() {
        return productService.getTotalClicksByCategory();
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