package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.repository.IProductRepository;
import RDP.Bazaar.backend.repository.ProductSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

// handles logic related to search and filter of products
@Service
public class SearchAndFilterProductService {
    // automatic injection of IProductRepository instance
    @Autowired
    private IProductRepository productRepository;

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
                // default sorting by productId if sortBy parameter is not provided
                return Comparator.comparing(Product::getProductid);
        }
    }
}
