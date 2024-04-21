package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.service.SearchAndFilterProductService;
import RDP.Bazaar.backend.service.SearchAndFilterUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/searchAndFilter")
public class SearchAndFilterController {
    // automatic injection of SearchAndFilterProductService instance
    @Autowired
    private SearchAndFilterProductService searchAndFilterProductService;

    // automatic injection of SearchAndFilterUserService instance
    @Autowired
    private SearchAndFilterUserService searchAndFilterUserService;

    // API endpoint for searching and filtering products
    @GetMapping("/products")
    public List<Product> searchAndFilterProducts(@RequestParam(required = false) String search,
                                                 @RequestParam(required = false) String category,
                                                 @RequestParam(required = false) String productCondition,
                                                 @RequestParam(required = false) Double minPrice,
                                                 @RequestParam(required = false) Double maxPrice,
                                                 @RequestParam(required = false) String sortBy) {
        return searchAndFilterProductService.searchAndFilterProducts(search, category, productCondition, minPrice, maxPrice, sortBy);
    }

    // API endpoint for searching and filtering users
    @GetMapping("/users")
    public List<User> searchAndFilterUsers(@RequestParam(required = false) String search,
                                           @RequestParam(required = false) String sortBy) {
        return searchAndFilterUserService.searchAndFilterUsers(search, sortBy);
    }
}
