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

    // API endpoint for searching and filtering products
    @GetMapping("/searchAndFilter")
    public List<Product> searchAndFilterProducts(@RequestParam(required = false) String search,
                                                 @RequestParam(required = false) String condition,
                                                 @RequestParam(required = false) Double minPrice,
                                                 @RequestParam(required = false) Double maxPrice,
                                                 @RequestParam(required = false) String sortBy) {
        return productService.searchAndFilterProducts(search, condition, minPrice, maxPrice, sortBy);
    }
}
