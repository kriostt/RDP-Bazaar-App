package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.service.ProductService;
import RDP.Bazaar.backend.service.ProductSrv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    // automatic injection of ProductService instance
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductSrv productSrv;

    // API endpoint for getting all products
    @GetMapping("/all")
    public List<Product> getAllProductsItem() {
        return productSrv.getAllItems();
    }
    @GetMapping("/")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/by-user/{userId}") // Path variable {userId}
    public List<Product> getProductsByUser(@PathVariable Long userId) {
        return productSrv.getProductsByUserId(userId);
    }


    @PostMapping("/save")
    public Product saveUser(@RequestBody Product items) {
        return productService.saveItem(items); // Delegate the saving operation to the UserService
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
        try {
            // Set the product ID for the updated product
            updatedProduct.setProductid(productId);

            // Call the service method to update the product
            Product updatedItem = productService.updateItem(updatedProduct);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            // Handle exception if the product is not found
            return ResponseEntity.notFound().build();
        }
    }


    // API endpoint to get a product by ID
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/find-byprod/{productid}")
    public ResponseEntity<Product> getProdByProdID(@PathVariable Long productid) {
        List<Product> products = productSrv.findProductById(productid);

        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Product not found
        }

        return new ResponseEntity<>(products.get(0), HttpStatus.OK); // Return the found product
    }
}
