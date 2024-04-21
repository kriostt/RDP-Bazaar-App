package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

public class SearchAndFilterProductServiceTest {
    // mock the IProductRepository interface
    @Mock
    IProductRepository productRepository;

    // create an instance of SearchAndFilterProductService and inject the mock repository
    @InjectMocks
    private SearchAndFilterProductService searchAndFilterProductService;

    // set up Mockito annotations before each test method
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void searchAndFilterProductsTest_SortByPriceAsc_ShouldReturnSpecificProductsOrderedByPriceAsc() {
        // create sample products
        Product product1 = new Product(
                1,
                "Product 1",
                "Description 1",
                10.00,
                "Clothing",
                "New",
                new Date(),
                0,
                new User()
        );
        Product product2 = new Product(
                2,
                "Product 2",
                "Description 2",
                20.00,
                "Category 2",
                "Condition 2",
                new Date(),
                0,
                new User()
        );
        Product product3 = new Product(
                2,
                "Product 3",
                "Description 3",
                30.00,
                "Clothing",
                "New",
                new Date(),
                0,
                new User()
        );

        // create a list containing the sample products
        List<Product> expectedProducts = new ArrayList<>();
        expectedProducts.add(product1);
        expectedProducts.add(product3);

        // mock the behaviour of productRepository to return list of expected products
        given(productRepository.findAll(any(Specification.class))).willReturn(expectedProducts);

        // test search and filter parameters
        String search = "Product";
        String category = "Clothing";
        String productCondition = "New";
        Double minPrice = 0.0;
        Double maxPrice = 30.0;
        String sortBy = "priceAsc";

        // call the searchAndFilterProducts method
        List<Product> actualProducts = searchAndFilterProductService.searchAndFilterProducts(
                search, category, productCondition, minPrice, maxPrice, sortBy
        );

        // --- assertions ---
        // expecting 2 products after filtering
        assertEquals(expectedProducts.size(), actualProducts.size());
        // expecting Product 1 to be the first product
        assertEquals("Product 1", actualProducts.get(0).getName());
        // expecting Product 3 to be the second product
        assertEquals("Product 3", actualProducts.get(1).getName());
    }

    @Test
    void searchAndFilterProductsTest_SortByPriceDesc_ShouldReturnSpecificProductsOrderedByPriceDesc() {
        // create sample products
        Product product1 = new Product(
                1,
                "Product 1",
                "Description 1",
                10.00,
                "Clothing",
                "New",
                new Date(),
                0,
                new User()
        );
        Product product2 = new Product(
                2,
                "Product 2",
                "Description 2",
                20.00,
                "Category 2",
                "Condition 2",
                new Date(),
                0,
                new User()
        );
        Product product3 = new Product(
                2,
                "Product 3",
                "Description 3",
                30.00,
                "Clothing",
                "New",
                new Date(),
                0,
                new User()
        );

        // create a list containing the sample products
        List<Product> expectedProducts = new ArrayList<>();
        expectedProducts.add(product1);
        expectedProducts.add(product3);

        // mock the behaviour of productRepository to return list of expected products
        given(productRepository.findAll(any(Specification.class))).willReturn(expectedProducts);

        // test search and filter parameters
        String search = "Product";
        String category = "Clothing";
        String productCondition = "New";
        Double minPrice = 0.0;
        Double maxPrice = 30.0;
        String sortBy = "priceDesc";

        // call the searchAndFilterProducts method
        List<Product> actualProducts = searchAndFilterProductService.searchAndFilterProducts(
                search, category, productCondition, minPrice, maxPrice, sortBy
        );

        // --- assertions ---
        // expecting 2 products after filtering
        assertEquals(expectedProducts.size(), actualProducts.size());
        // expecting Product 3 to be the first product
        assertEquals("Product 3", actualProducts.get(0).getName());
        // expecting Product 1 to be the second product
        assertEquals("Product 1", actualProducts.get(1).getName());
    }

    @Test
    void searchAndFilterProductsTest_SortByDatePostedAsc_ShouldReturnSpecificProductsOrderedByDatePostedAsc() {
        // create sample products
        Product product1 = new Product(
                1,
                "Product 1",
                "Description 1",
                10.00,
                "Clothing",
                "New",
                new Date(2024, 4, 20),
                0,
                new User()
        );
        Product product2 = new Product(
                2,
                "Product 2",
                "Description 2",
                20.00,
                "Category 2",
                "Condition 2",
                new Date(),
                0,
                new User()
        );
        Product product3 = new Product(
                2,
                "Product 3",
                "Description 3",
                30.00,
                "Clothing",
                "New",
                new Date(2024, 4, 21),
                0,
                new User()
        );

        // create a list containing the sample products
        List<Product> expectedProducts = new ArrayList<>();
        expectedProducts.add(product1);
        expectedProducts.add(product3);

        // mock the behaviour of productRepository to return list of expected products
        given(productRepository.findAll(any(Specification.class))).willReturn(expectedProducts);

        // test search and filter parameters
        String search = "Product";
        String category = "Clothing";
        String productCondition = "New";
        Double minPrice = 0.0;
        Double maxPrice = 30.0;
        String sortBy = "datePostedAsc";

        // call the searchAndFilterProducts method
        List<Product> actualProducts = searchAndFilterProductService.searchAndFilterProducts(
                search, category, productCondition, minPrice, maxPrice, sortBy
        );

        // --- assertions ---
        // expecting 2 products after filtering
        assertEquals(expectedProducts.size(), actualProducts.size());
        // expecting Product 1 to be the first product
        assertEquals("Product 1", actualProducts.get(0).getName());
        // expecting Product 3 to be the second product
        assertEquals("Product 3", actualProducts.get(1).getName());
    }

    @Test
    void searchAndFilterProductsTest_SortByDatePostedDesc_ShouldReturnSpecificProductsOrderedByDatePostedDesc() {
        // create sample products
        Product product1 = new Product(
                1,
                "Product 1",
                "Description 1",
                10.00,
                "Clothing",
                "New",
                new Date(2024, 4, 20),
                0,
                new User()
        );
        Product product2 = new Product(
                2,
                "Product 2",
                "Description 2",
                20.00,
                "Category 2",
                "Condition 2",
                new Date(),
                0,
                new User()
        );
        Product product3 = new Product(
                2,
                "Product 3",
                "Description 3",
                30.00,
                "Clothing",
                "New",
                new Date(2024, 4, 21),
                0,
                new User()
        );

        // create a list containing the sample products
        List<Product> expectedProducts = new ArrayList<>();
        expectedProducts.add(product1);
        expectedProducts.add(product3);

        // mock the behaviour of productRepository to return list of expected products
        given(productRepository.findAll(any(Specification.class))).willReturn(expectedProducts);

        // test search and filter parameters
        String search = "Product";
        String category = "Clothing";
        String productCondition = "New";
        Double minPrice = 0.0;
        Double maxPrice = 30.0;
        String sortBy = "datePostedDesc";

        // call the searchAndFilterProducts method
        List<Product> actualProducts = searchAndFilterProductService.searchAndFilterProducts(
                search, category, productCondition, minPrice, maxPrice, sortBy
        );

        // --- assertions ---
        // expecting 2 products after filtering
        assertEquals(expectedProducts.size(), actualProducts.size());
        // expecting Product 3 to be the first product
        assertEquals("Product 3", actualProducts.get(0).getName());
        // expecting Product 1 to be the second product
        assertEquals("Product 1", actualProducts.get(1).getName());
    }

    @Test
    void searchAndFilterProductsTest_SortByDefault_ShouldReturnSpecificProductsOrderedByProductId() {
        // create sample products
        Product product1 = new Product(
                1,
                "Product 1",
                "Description 1",
                10.00,
                "Clothing",
                "New",
                new Date(),
                0,
                new User()
        );
        Product product2 = new Product(
                2,
                "Product 2",
                "Description 2",
                20.00,
                "Category 2",
                "Condition 2",
                new Date(),
                0,
                new User()
        );
        Product product3 = new Product(
                2,
                "Product 3",
                "Description 3",
                30.00,
                "Clothing",
                "New",
                new Date(),
                0,
                new User()
        );

        // create a list containing the sample products
        List<Product> expectedProducts = new ArrayList<>();
        expectedProducts.add(product1);
        expectedProducts.add(product3);

        // mock the behaviour of productRepository to return list of expected products
        given(productRepository.findAll(any(Specification.class))).willReturn(expectedProducts);

        // test search and filter parameters
        String search = "Product";
        String category = "Clothing";
        String productCondition = "New";
        Double minPrice = 0.0;
        Double maxPrice = 30.0;
        String sortBy = "";

        // call the searchAndFilterProducts method
        List<Product> actualProducts = searchAndFilterProductService.searchAndFilterProducts(
                search, category, productCondition, minPrice, maxPrice, sortBy
        );

        // --- assertions ---
        // expecting 2 products after filtering
        assertEquals(expectedProducts.size(), actualProducts.size());
        // expecting Product 1 to be the first product
        assertEquals("Product 1", actualProducts.get(0).getName());
        // expecting Product 3 to be the second product
        assertEquals("Product 3", actualProducts.get(1).getName());
    }
}
