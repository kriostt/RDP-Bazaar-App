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
import java.util.stream.Collectors;

// handles logic related to search and filter of products and users
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

        // use streams for sorting products
        Comparator<Product> productComparator = getProductComparator(sortBy);
        products = products.stream()
                // remove user information from each product to avoid unnecessary data exposure
                .peek(product -> product.setUser(null))
                .sorted(productComparator)
                .collect(Collectors.toList());

        return products;
    }

    // generates comparator for sorting products based on sortBy parameter
    private Comparator<Product> getProductComparator(String sortBy) {
        switch (sortBy) {
            case "priceAsc":
                return Comparator.comparing(Product::getPrice);
            case "priceDesc":
                return Comparator.comparing(Product::getPrice).reversed();
            case "datePostedAsc":
                return Comparator.comparing(Product::getDatePosted);
            case "datePostedDesc":
                return Comparator.comparing(Product::getDatePosted).reversed();
            default:
                // default sorting by product ID
                return Comparator.comparing(Product::getProductId);
        }
    }

    // get users based on search and filter criteria
    public List<User> searchAndFilterUsers(String search, String sortBy) {
        // find users based on search and filter criteria using specifications
        List<User> users = userRepository.findAll(UserSpecifications.searchAndFilterUsers(search));

        // use streams for sorting users
        Comparator<User> userComparator = getUserComparator(sortBy);
        users = users.stream()
                // remove product list from user to avoid unnecessary data exposure
                .peek(user -> user.setProducts(null))
                .sorted(userComparator)
                .collect(Collectors.toList());

        return users;
    }

    // generates comparator for sorting users based on sortBy parameter
    private Comparator<User> getUserComparator(String sortBy) {
        switch (sortBy) {
            case "nameAsc":
                return Comparator.comparing(User::getFirstName);
            case "nameDesc":
                return Comparator.comparing(User::getFirstName).reversed();
            default:
                // default sorting by user ID
                return Comparator.comparing(User::getUserId);
        }
    }
}
