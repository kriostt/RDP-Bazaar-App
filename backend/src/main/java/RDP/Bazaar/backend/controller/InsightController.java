package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.service.InsightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insights")
@CrossOrigin(origins = "http://localhost:3000")
public class InsightController {
    // automatic injection of InsightService instance
    @Autowired
    private InsightService insightService;

    // API endpoint to increment number of clicks for specific product
    @PostMapping("/incrementClicks/{productId}")
    public void incrementClicks(@PathVariable Long productId) {
        insightService.incrementClicks(productId);
    }

    // API endpoint to get the total number of products that belong to a user
    @GetMapping("/productCount/{userId}")
    public int countProductsByUserId(@PathVariable Long userId) {
        return insightService.countProductsByUserId(userId);
    }

    // API endpoint to get all products that belong to a user
    @GetMapping("/products/{userId}")
    public List<Object[]> getAllProductsByUserId(@PathVariable Long userId) {
        return insightService.getAllProductsByUserId(userId);
    }

    // API endpoint to get the total number of clicks for all products that belong to a user
    @GetMapping("/totalClicks/{userId}")
    public int getTotalClicksForUser(@PathVariable Long userId) {
        return insightService.getTotalClicksForUser(userId);
    }

    // API endpoint to get the total number of clicks for each product owned by a user
    @GetMapping("/clicksPerProduct/{userId}")
    public List<Object[]> getClicksPerProductForUser(@PathVariable Long userId) {
        return insightService.getClicksPerProductForUser(userId);
    }

    // API endpoint to get the total number of clicks for each product category for a specific user
    @GetMapping("/clicksPerCategory/{userId}")
    public List<Object[]> getClicksPerCategoryForUser(@PathVariable Long userId) {
        return insightService.getClicksPerCategoryForUser(userId);
    }
}
