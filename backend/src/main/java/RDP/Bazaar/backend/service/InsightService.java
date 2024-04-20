package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.repository.IInsightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// handles logic related to insights
@Service
public class InsightService {
    // automatic injection of IInsightRepository instance
    @Autowired
    private IInsightRepository insightRepository;

    // increment number of clicks for specific product
    public void incrementClicks(Long productId) {
        insightRepository.incrementClicks(productId);
    }

    // get the total number of products that belong to a user
    public int countProductsByUserId(Long userId) {
        return insightRepository.countByUserUserId(userId);
    }

    // get all products that belong to a user
    public List<Object[]> getAllProductsByUserId(Long userId) {
        return insightRepository.getAllProductsByUserId(userId);
    }

    // get the total number of clicks for all products that belong to a user
    public Integer getTotalClicksForUser(Long userId) {
        return insightRepository.getTotalClicksForUser(userId);
    }
    
    // get the total number of clicks for each product owned by a user
    public List<Object[]> getClicksPerProductForUser(Long userId) {
        return insightRepository.getClicksPerProductForUser(userId);
    }

    // get the total number of clicks for each product category for a specific user
    public List<Object[]> getTotalClicksByCategoryForUser(Long userId) {
        return insightRepository.getTotalClicksByCategoryForUser(userId);
    }
}
