package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.repository.IProductRepository;
import RDP.Bazaar.backend.repository.ProductSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

// handles business logic related to Product entities
@Service
public class ProductService {
    // automatic injection of IProductRepository instance
    @Autowired
    private IProductRepository productRepository;

    // get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // get products based on search and filter criteria
    public List<Product> searchAndFilterProducts(
            String search, String productCondition, Double minPrice, Double maxPrice, String sortBy) {

        // find products based on search and filter criteria using specifications
        List<Product> products = productRepository.findAll(
                ProductSpecifications.searchAndFilterProducts(search, productCondition, minPrice, maxPrice)
        );

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
}
