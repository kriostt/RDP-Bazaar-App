package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

public class ProductServiceTest {

    @Mock
    IProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getProductById_existingProduct_shouldReturnProduct() {
        // Arrange
        Long productId = 1L;
        Product product = new Product();
        product.setProductid(productId);
        product.setName("Product 1");
        product.setDescription("Description 1");
        product.setPrice(10.0);

        List<Product> productList = new ArrayList<>();
        productList.add(product);

        given(productRepository.findAll()).willReturn(productList);

        // Act
        Product result = productService.getProductById(productId);

        // Assert
        // Verify that the returned product matches the expected product
        assertEquals(product, result);
    }

    @Test
    void getProductById_nonExistingProduct_shouldReturnNull() {
        // Arrange
        Long productId = 2L; // Assuming this product ID doesn't exist
        List<Product> productList = new ArrayList<>();
        given(productRepository.findAll()).willReturn(productList);

        // Act
        Product result = productService.getProductById(productId);

        // Assert
        // Verify that null is returned for a non-existing product ID
        assertEquals(null, result);
    }
}
