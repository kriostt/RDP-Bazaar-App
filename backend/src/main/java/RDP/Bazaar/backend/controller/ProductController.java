package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.service.ProductService;
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
