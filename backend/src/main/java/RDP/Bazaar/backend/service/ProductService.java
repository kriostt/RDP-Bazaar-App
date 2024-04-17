package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProductService {
    private final Map<Long, Product> products = new HashMap<>();
    private long nextId = 1;

    public ProductService() {
        // Add some dummy data for demonstration
        createProduct(new Product("Backpack", "Durable backpack with multiple compartments and padded straps.", 24.99));
        createProduct(new Product("Bluetooth Speaker", "Portable Bluetooth speaker with high-fidelity sound.", 44.99));
        createProduct(new Product("Water Bottle", "Stylish water bottle to stay hydrated.", 9.99));
    }

    public void deleteProduct(Long id) {
        products.remove(id);
    }

    public Product updateProduct(Long id, Product product) {
        if (products.containsKey(id)) {
            product.setId(id);
            products.put(id, product);
            return product;
        }
        return null;
    }

    public Product createProduct(Product product) {
        long id = nextId++;
        product.setId(id);
        products.put(id, product);
        return product;
    }

    public Product getProductById(Long id) {
        return products.get(id);
    }

    public List<Product> getAllProducts() {
        return new ArrayList<>(products.values());
    }
}
