package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    // automatic injection of ProductService instance
    @Autowired
    private ProductService productService;

    // API endpoint for searching products by name or description
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String search) {
        return productService.search(search);
    }

    // API endpoint for filtering products by condition
    @GetMapping("/filterByCondition")
    public List<Product> filterProductsByCondition(@RequestParam String condition) {
        return productService.filterByCondition(condition);
    }

    // API endpoint for filtering products by price range
    @GetMapping("/filterByPrice")
    public List<Product> filterProductsByPriceRange(@RequestParam double minPrice, @RequestParam double maxPrice) {
        return productService.filterByPriceRange(minPrice, maxPrice);
    }

    // API endpoint for getting all products sorted by price in ascending order
    @GetMapping("/sortByPriceAsc")
    public List<Product> getAllProductsSortedByPriceAscending() {
        return productService.getAllProductsSortedByPriceAscending();
    }

    // API endpoint for getting all products sorted by price in descending order
    @GetMapping("/sortByPriceDesc")
    public List<Product> getAllProductsSortedByPriceDescending() {
        return productService.getAllProductsSortedByPriceDescending();
    }

    // API endpoint for getting all products sorted by date posted in ascending order
    @GetMapping ("/sortByDatePostedAsc")
    public List<Product> getAllProductsSortedByDatePostedAscending() {
        return productService.getAllProductsSortedByDatePostedAscending();
    }

    // API endpoint for getting all products sorted by date posted in descending order
    @GetMapping ("/sortByDatePostedDesc")
    public List<Product> getAllProductsSortedByDatePostedDescending() {
        return productService.getAllProductsSortedByDatePostedDescending();
    }
}
