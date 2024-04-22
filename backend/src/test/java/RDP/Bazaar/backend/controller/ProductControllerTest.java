package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;
import org.springframework.http.MediaType;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// Alessandra's Test Cases
public class ProductControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = standaloneSetup(productController).build();
    }

    @Test
    void getProductById_existingProduct_shouldReturnProduct() throws Exception {
        // Arrange
        Long productid = 1L;
        Product product = new Product();
        product.setProductid(productid);
        product.setName("Product 1");
        product.setDescription("Description 1");
        product.setPrice(10.0);

        given(productService.getProductById(productid)).willReturn(product);

        // Act & Assert
        mockMvc.perform(get("/api/products/{productId}", productid))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"productid\":1,\"name\":\"Product 1\",\"description\":\"Description 1\",\"price\":10.0}"));
    }

    @Test
    void getProductById_nonExistingProduct_shouldReturnNotFound() throws Exception {
        // Arrange
        Long productId = 2L; // Assuming this product ID doesn't exist
        given(productService.getProductById(productId)).willReturn(null);

        // Act & Assert
        mockMvc.perform(get("/api/products/{productId}", productId))
                .andExpect(status().isNotFound());
    }

}
