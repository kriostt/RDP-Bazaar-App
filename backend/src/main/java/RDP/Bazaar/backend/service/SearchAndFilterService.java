package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IProductRepository;
import RDP.Bazaar.backend.repository.IUserRepository;
import RDP.Bazaar.backend.repository.ProductSpecifications;
import RDP.Bazaar.backend.repository.UserSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

// handles logic related to search and filter
@Service
public class SearchAndFilterService {
    // automatic injection of IProductRepository instance
    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IUserRepository userRepository;

    // get products based on search and filter criteria
    public List<Product> searchAndFilterProducts(
            String search, String category, String productCondition, Double minPrice, Double maxPrice, String sortBy) {

        // find products based on search and filter criteria using specifications
        List<Product> products = productRepository.findAll(
                ProductSpecifications.searchAndFilterProducts(search, category, productCondition, minPrice, maxPrice)
        );

        // remove user information from each product
        products.forEach(product -> product.setUser(null));

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

    // get users based on search and filter criteria
    public List<User> searchAndFilterUsers(String search, String sortBy) {
        // find users based on search and filter criteria using specifications
        List<User> users = userRepository.findAll(UserSpecifications.searchAndFilterUsers(search));

        // remove product list from each user
        users.forEach(user -> user.setProducts(null));

        // sort users based on provided sortBy parameter
        if ("usernameAsc".equals(sortBy)) {
            users.sort(Comparator.comparing(User::getUsername));
        } else if ("usernameDesc".equals(sortBy)) {
            users.sort(Comparator.comparing(User::getUsername).reversed());
        }

        return users;
    }
}
