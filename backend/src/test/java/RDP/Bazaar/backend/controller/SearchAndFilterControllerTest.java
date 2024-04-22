package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.service.SearchAndFilterProductService;
import RDP.Bazaar.backend.service.SearchAndFilterUserService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class SearchAndFilterControllerTest {
    // initialize the MockMvc instance
    private MockMvc mockMvc;

    // mock the SearchAndFilterProductService dependency
    @Mock
    private SearchAndFilterProductService searchAndFilterProductService;

    // mock the SearchAndFilterUserService dependency
    @Mock
    private SearchAndFilterUserService searchAndFilterUserService;

    // inject the mocked SearchAndFilterService into the SearchAndFilterController
    @InjectMocks
    private SearchAndFilterController searchAndFilterController;

    // runs before each test method
    @BeforeEach
    void setUp() {
        // initializes annotated mock objects
        MockitoAnnotations.openMocks(this);

        // build standalone MockMvc instance for the SearchAndFilterController
        mockMvc = standaloneSetup(searchAndFilterController).build();
    }

    // test for searchAndFilterProducts method
    @Test
    void searchAndFilterProductsTest_ShouldReturnSpecificProducts() throws Exception {
        // create sample product
        Product product = new Product(
                1L,
                "Product 1",
                "Description 1",
                10.00,
                "Clothing",
                "New",
                "imgurl 1",
                new Date(),
                1L,
                0
        );

        // create a list containing the sample products
        List<Product> expectedProducts = new ArrayList<>();
        expectedProducts.add(product);

        // convert expectedProducts to JSON format
        ObjectMapper objectMapper = new ObjectMapper();
        String expectedProductsJson = objectMapper.writeValueAsString(expectedProducts);

        // mock the behaviour of searchAndFilterService.searchAndFilterProducts() to return expected products
        given(searchAndFilterProductService
                .searchAndFilterProducts(any(), any(),any(), any(), any(), any()))
                .willReturn(expectedProducts);

        // perform a GET request to the "/api/searchAndFilter/products" endpoint
        mockMvc.perform(get("/api/searchAndFilter/products"))
                // expect a status code of 200 (OK)
                .andExpect(status().isOk())
                // expect the response content to match the provided JSON representation of the products
                .andExpect(content().json(expectedProductsJson));
    }

    // test for searchAndFilterUsers method
    @Test
    void searchAndFilterUsersTest_ShouldReturnSpecificUsers() throws Exception {
        // create sample user
        User user = new User(
                1,
                "username1",
                "Josh1",
                "Lastname1",
                "",
                "",
                "",
                "",
                null,
                null
        );

        // create a list containing the sample users
        List<User> expectedUsers = new ArrayList<>();
        expectedUsers.add(user);

        // mock the behaviour of searchAndFilterService.searchAndFilterUsers() to return expected users
        given(searchAndFilterUserService
                .searchAndFilterUsers(any(), any()))
                .willReturn(expectedUsers);

        // perform a GET request to the "/api/searchAndFilter/users" endpoint
        mockMvc.perform(get("/api/searchAndFilter/users"))
                // expect a status code of 200 (OK)
                .andExpect(status().isOk())
                // expect the response content to match the provided JSON representation of the users
                .andExpect(content()
                        .json("[{" +
                                "\"userId\": 1," +
                                "\"username\": \"username1\"," +
                                "\"firstName\": \"Josh1\"," +
                                "\"lastName\": \"Lastname1\"" +
                                "}]"
                        )
                );
    }
}
