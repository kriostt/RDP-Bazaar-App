package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

public class SearchAndFilterUserServiceTest {
    // mock the IUserRepository interface
    @Mock
    IUserRepository userRepository;

    // create an instance of SearchAndFilterUserService and inject the mock repository
    @InjectMocks
    private SearchAndFilterUserService searchAndFilterUserService;

    // set up Mockito annotations before each test method
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // test for searchAndFilterUsers method - sorting by name ascending
    @Test
    void searchAndFilterUsersTest_SortByNameAsc_ShouldReturnSpecificUsersOrderedByNameAsc() {
        // create sample users
        User user1 = new User(
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
        User user2 = new User(
                2,
                "username2",
                "Josh2",
                "Lastname2",
                "",
                "",
                "",
                "",
                null,
                null
        );
        User user3 = new User(
                3,
                "username3",
                "Josh3",
                "Lastname3",
                "",
                "",
                "",
                "",
                null,
                null
        );

        // create a list containing the sample users
        List<User> expectedUsers = new ArrayList<>();
        expectedUsers.add(user1);
        expectedUsers.add(user3);

        // mock the behaviour of userRepository to return list of expected users
        given(userRepository.findAll(any(Specification.class))).willReturn(expectedUsers);

        // test search and filter parameters
        String search = "Josh";
        String sortBy = "nameAsc";

        // call the searchAndFilterUsers method
        List<User> actualUsers = searchAndFilterUserService.searchAndFilterUsers(
                search, sortBy
        );

        // --- assertions ---
        // expecting 2 users after filtering
        assertEquals(expectedUsers.size(), actualUsers.size());
        // expecting Josh1 to be the first user
        assertEquals("Josh1", actualUsers.get(0).getFirstName());
        // expecting Josh3 to be the second user
        assertEquals("Josh3", actualUsers.get(1).getFirstName());
    }

    // test for searchAndFilterUsers method - sorting by name descending
    @Test
    void searchAndFilterUsersTest_SortByNameDesc_ShouldReturnSpecificUsersOrderedByNameDesc() {
        // create sample users
        User user1 = new User(
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
        User user2 = new User(
                2,
                "username2",
                "Josh2",
                "Lastname2",
                "",
                "",
                "",
                "",
                null,
                null
        );
        User user3 = new User(
                3,
                "username3",
                "Josh3",
                "Lastname3",
                "",
                "",
                "",
                "",
                null,
                null
        );

        // create a list containing the sample users
        List<User> expectedUsers = new ArrayList<>();
        expectedUsers.add(user1);
        expectedUsers.add(user3);

        // mock the behaviour of userRepository to return list of expected users
        given(userRepository.findAll(any(Specification.class))).willReturn(expectedUsers);

        // test search and filter parameters
        String search = "Josh";
        String sortBy = "nameDesc";

        // call the searchAndFilterUsers method
        List<User> actualUsers = searchAndFilterUserService.searchAndFilterUsers(
                search, sortBy
        );

        // --- assertions ---
        // expecting 2 users after filtering
        assertEquals(expectedUsers.size(), actualUsers.size());
        // expecting Josh3 to be the first user
        assertEquals("Josh3", actualUsers.get(0).getFirstName());
        // expecting Josh1 to be the second user
        assertEquals("Josh1", actualUsers.get(1).getFirstName());
    }

    // test for searchAndFilterUsers method - sorting by default (user ID)
    @Test
    void searchAndFilterUsersTest_SortByDefault_ShouldReturnSpecificUsersOrderedByUserId() {
        // create sample users
        User user1 = new User(
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
        User user2 = new User(
                2,
                "username2",
                "Josh2",
                "Lastname2",
                "",
                "",
                "",
                "",
                null,
                null
        );
        User user3 = new User(
                3,
                "username3",
                "Josh3",
                "Lastname3",
                "",
                "",
                "",
                "",
                null,
                null
        );

        // create a list containing the sample users
        List<User> expectedUsers = new ArrayList<>();
        expectedUsers.add(user1);
        expectedUsers.add(user3);

        // mock the behaviour of userRepository to return list of expected users
        given(userRepository.findAll(any(Specification.class))).willReturn(expectedUsers);

        // test search and filter parameters
        String search = "Josh";
        String sortBy = "";

        // call the searchAndFilterUsers method
        List<User> actualUsers = searchAndFilterUserService.searchAndFilterUsers(
                search, sortBy
        );

        // --- assertions ---
        // expecting 2 users after filtering
        assertEquals(expectedUsers.size(), actualUsers.size());
        // expecting Josh1 to be the first user
        assertEquals("Josh1", actualUsers.get(0).getFirstName());
        // expecting Josh3 to be the second user
        assertEquals("Josh3", actualUsers.get(1).getFirstName());
    }
}
