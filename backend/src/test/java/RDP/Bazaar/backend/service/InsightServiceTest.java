package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IInsightRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class InsightServiceTest {
    // mock the IInsightRepository interface
    @Mock
    IInsightRepository insightRepository;

    // create an instance of InsightService and inject the mock repository
    @InjectMocks
    private InsightService insightService;

    // set up Mockito annotations before each test method
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // test for incrementClicks method
    @Test
    void incrementClicksTest() {
        // create productId for testing
        Long productId = 1L;

        // call the incrementClicks method
        insightService.incrementClicks(productId);

        // verify that the incrementClicks method of insightRepository is called with productId
        verify(insightRepository, times(1)).incrementClicks(productId);
    }

    // test for countProductsByUserId method
    @Test
    void countProductsByUserIdTest_ShouldReturnProductCountOfUser() {
        // create userId and expectedCount for testing
        Long userId = 1L;
        int expectedCount = 1;

        // mock the behaviour of insightRepository to return expected count
        given(insightRepository.countByUserUserId(userId)).willReturn(expectedCount);

        // call the countByUserUserId method
        int actualCount = insightService.countProductsByUserId(userId);

        // assert that the actual count matches the expected count
        assertEquals(expectedCount, actualCount);
    }

    // test for getAllProductsByUserId method
    @Test
    void getAllProductsByUserIdTest_ShouldReturnProductsOfUser() {
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

        // create userId for testing
        Long userId = 1L;

        // mock the behaviour of insightRepository to return list of expected products
        given(insightRepository.getAllProductsByUserId(userId)).willReturn(expectedProducts);

        // call the getAllProductsByUserId method
        List<Object[]> actualProducts = insightService.getAllProductsByUserId(userId);

        // --- assertions ---
        // expecting 1 product
        assertEquals(expectedProducts.size(), actualProducts.size());
        // assert that the actual products returned match the expected products
        for (int i = 0; i < expectedProducts.size(); i++) {
            assertEquals(Arrays.toString(expectedProducts.get(i)), Arrays.toString(actualProducts.get(i)));
        }
    }

    // test for getTotalClicksForUser method
    @Test
    void getTotalClicksForUserTest_ShouldReturnTotalClicksOfUser() {
        // create userId and expectedTotalClicks for testing
        Long userId = 1L;
        int expectedTotalClicks = 1;

        // mock the behaviour of insightRepository to return expected total clicks
        given(insightRepository.getTotalClicksForUser(userId)).willReturn(expectedTotalClicks);

        // call the getTotalClicksForUser method
        int actualTotalClicks = insightService.getTotalClicksForUser(userId);

        // assert that the actual total clicks matches the expected total clicks
        assertEquals(expectedTotalClicks, actualTotalClicks);
    }

    // test for getClicksPerProductForUser method
    @Test
    void getClicksPerProductForUserTest_ShouldReturnClicksPerProductOfUser() {
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

        // create userId for testing
        Long userId = 1L;

        // mock the behaviour of insightRepository to return expected clicks per product
        given(insightRepository.getClicksPerProductForUser(userId)).willReturn(expectedClicksPerProduct);

        // call the getClicksPerProductForUser method
        List<Object[]> actualClicksPerProduct = insightService.getClicksPerProductForUser(userId);

        // --- assertions ---
        assertEquals(expectedClicksPerProduct.size(), actualClicksPerProduct.size());
        for (int i = 0; i < expectedClicksPerProduct.size(); i++) {
            assertEquals(Arrays.toString(expectedClicksPerProduct.get(i)), Arrays.toString(actualClicksPerProduct.get(i)));
        }
    }

    // test for getClicksPerCategoryForUser method
    @Test
    void getClicksPerCategoryForUserTest_ShouldReturnClicksPerCategoryOfUser() {
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

        // create userId for testing
        Long userId = 1L;

        // // mock the behaviour of insightRepository to return expected clicks per categpry
        given(insightRepository.getClicksPerCategoryForUser(userId)).willReturn(expectedClicksPerCategory);

        // call the getTotalClicksByCategoryForUser method
        List<Object[]> actualClicksPerCategory = insightService.getClicksPerCategoryForUser(userId);

        // --- assertions ---
        assertEquals(expectedClicksPerCategory.size(), actualClicksPerCategory.size());
        for (int i = 0; i < expectedClicksPerCategory.size(); i++) {
            assertEquals(Arrays.toString(expectedClicksPerCategory.get(i)), Arrays.toString(actualClicksPerCategory.get(i)));
        }
    }
}
