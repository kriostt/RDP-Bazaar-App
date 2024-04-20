package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.service.InsightService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class InsightControllerTest {
    // initialize the MockMvc instance
    private MockMvc mockMvc;

    // mock the InsightService dependency
    @Mock
    private InsightService insightService;

    // inject the mocked InsightService into the InsightController
    @InjectMocks
    private InsightController insightController;

    // runs before each test method
    @BeforeEach
    void setUp() {
        // initializes annotated mock objects
        MockitoAnnotations.openMocks(this);

        // build standalone MockMvc instance for the InsightController
        mockMvc = standaloneSetup(insightController).build();
    }

    @Test
    void incrementClicksTest() throws Exception {
        // create productId for testing
        Long productId = 1L;

        // perform a POST request to the "/api/insights/incrementClicks/{productId}" endpoint
        mockMvc.perform(post("/api/insights/incrementClicks/{productId}", productId))
                // expect a status code of 200 (OK)
                .andExpect(status().isOk());

        // verify that the incrementClicks method of insightService is called with productId
        verify(insightService, times(1)).incrementClicks(productId);
    }

    @Test
    void countProductsByUserIdTest_ShouldReturnProductCountOfUser() throws Exception {
        // create userId and expectedCount for testing
        Long userId = 1L;
        int expectedCount = 1;

        // mock the behaviour of insightService.countProductsByUserId() to return expected count
        given(insightService.countProductsByUserId(userId)).willReturn(expectedCount);

        // perform a GET request to the "/api/insights/productCount/{userId}" endpoint
        mockMvc.perform(get("/api/insights/productCount/{userId}", userId))
                // expect a status code of 200 (OK)
                .andExpect(status().isOk())
                // expect the content type to be JSON
                .andExpect(content().contentType("application/json"))
                // expect the response body to contain the expected count
                .andExpect(content().string(String.valueOf(expectedCount)));
    }

    @Test
    void getAllProductsByUserIdTest_ShouldReturnProductsOfUser() throws Exception {
        // create sample user
        User user = new User();
        user.setUserId((1L));

        // create sample product
        Product product = new Product(
                1,
                "Product 1",
                "Description 1",
                10.00,
                "Clothing",
                "New",
                new Date(),
                0,
                user
        );

        // create a list containing the sample products
        List<Object[]> expectedProducts = new ArrayList<>();
        expectedProducts.add(new Object[]{product});

        // convert expectedProducts to JSON format
        ObjectMapper objectMapper = new ObjectMapper();
        String expectedProductsJson = objectMapper.writeValueAsString(expectedProducts);

        // create userId for testing
        Long userId = 1L;

        // mock the behaviour of insightService.getAllProductsByUserId
        given(insightService.getAllProductsByUserId(userId)).willReturn(expectedProducts);

        // perform a GET request to the "/api/insights/products/{userId}" endpoint
        mockMvc.perform(get("/api/insights/products/{userId}", userId))
                // expect a status code of 200 (OK)
                .andExpect(status().isOk())
                // expect the response body to contain the expected products
                .andExpect(content().json(expectedProductsJson));
    }

    @Test
    void getTotalClicksForUserTest_ShouldReturnTotalClicksOfUser() throws Exception {
        // create userId and expectedTotalClicks for testing
        Long userId = 1L;
        int expectedTotalClicks = 1;

        // mock the behaviour of insightService.getTotalClicksForUser() to return expect total clicks
        given(insightService.getTotalClicksForUser(userId)).willReturn(expectedTotalClicks);

        // perform a GET request to the "/api/insights/totalClicks/{userId}" endpoint
        mockMvc.perform(get("/api/insights/totalClicks/{userId}", userId))
                // expect a status code of 200 (OK)
                .andExpect(status().isOk())
                // expect the content type to be JSON
                .andExpect(content().contentType("application/json"))
                // expect the response body to contain the expected total clicks
                .andExpect(content().string(String.valueOf(expectedTotalClicks)));
    }

    @Test
    void getClicksPerProductForUserTest_ShouldReturnClicksPerProductOfUser() throws Exception {
        // create sample user
        User user = new User();
        user.setUserId((1L));

        // create sample product
        Product product = new Product(
                1,
                "Product 1",
                "Description 1",
                10.00,
                "Clothing",
                "New",
                new Date(),
                1,
                user
        );

        // create a list containing the expected clicks per product
        List<Object[]> expectedClicksPerProduct = new ArrayList<>();
        expectedClicksPerProduct.add(new Object[]{1, "Product 1", 1});

        // convert expectedClicksPerProduct to JSON format
        ObjectMapper objectMapper = new ObjectMapper();
        String expectedClicksPerProductJson = objectMapper.writeValueAsString(expectedClicksPerProduct);

        // create userId for testing
        Long userId = 1L;

        // mock the behavior of insightService.getClicksPerProductForUser() to return expected clicks per product
        given(insightService.getClicksPerProductForUser(userId)).willReturn(expectedClicksPerProduct);

        // perform a GET request to the "/api/insights/clicksPerProduct/{userId}" endpoint
        mockMvc.perform(get("/api/insights/clicksPerProduct/{userId}", userId))
                // expect status code 200 (OK)
                .andExpect(status().isOk())
                // expect the response body to contain the expected clicks per product
                .andExpect(content().json(expectedClicksPerProductJson));
    }

    @Test
    void getClicksPerCategoryForUserTest_ShouldReturnClicksPerCategoryOfUser() throws Exception {
        // create sample user
        User user = new User();
        user.setUserId((1L));

        // create sample product
        Product product = new Product(
                1,
                "Product 1",
                "Description 1",
                10.00,
                "Clothing",
                "New",
                new Date(),
                1,
                user
        );

        // create a list containing the expected clicks per category
        List<Object[]> expectedClicksPerCategory = new ArrayList<>();
        expectedClicksPerCategory.add(new Object[]{"Clothing", 1});

        // convert expectedClicksPerCategory to JSON format
        ObjectMapper objectMapper = new ObjectMapper();
        String expectedClicksPerCategoryJson = objectMapper.writeValueAsString(expectedClicksPerCategory);

        // create userId for testing
        Long userId = 1L;

        // mock the behavior of insightService.getClicksPerCategoryForUser() to return expected clicks per category
        given(insightService.getClicksPerCategoryForUser(userId)).willReturn(expectedClicksPerCategory);

        // perform a GET request to the "/api/insights/clicksPerCategory/{userId}" endpoint
        mockMvc.perform(get("/api/insights/clicksPerCategory/{userId}", userId))
                // expect status code 200 (OK)
                .andExpect(status().isOk())
                // expect the response body to contain the expected clicks per category
                .andExpect(content().json(expectedClicksPerCategoryJson));
    }
}
