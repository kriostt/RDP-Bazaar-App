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
    public int countProductsByUserId(Long sellerid) {
        return insightRepository.countBySellerid(sellerid);
    }

    // get all products that belong to a user
    public List<Object[]> getAllProductsByUserId(Long userId) {
        return insightRepository.getAllProductsByUserId(userId);
    }

    // get the total number of clicks for all products that belong to a user
    public int getTotalClicksForUser(Long userId) {
        return insightRepository.getTotalClicksForUser(userId);
    }
    
    // get the total number of clicks for each product owned by a user
    public List<Object[]> getClicksPerProductForUser(Long userId) {
        return insightRepository.getClicksPerProductForUser(userId);
    }

    // get the total number of clicks for each product category for a specific user
    public List<Object[]> getClicksPerCategoryForUser(Long userId) {
        return insightRepository.getClicksPerCategoryForUser(userId);
    }
}
