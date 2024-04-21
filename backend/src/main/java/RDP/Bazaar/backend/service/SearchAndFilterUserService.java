package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IUserRepository;
import RDP.Bazaar.backend.repository.UserSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

// handles logic related to search and filter of users
@Service
public class SearchAndFilterUserService {
    // automatic injection of IUserRepository instance
    @Autowired
    private IUserRepository userRepository;

    // get users based on search and filter criteria
    public List<User> searchAndFilterUsers(String search, String sortBy) {
        // find users based on search and filter criteria using specifications
        List<User> users = userRepository.findAll(UserSpecifications.searchAndFilterUsers(search));

        // use streams for sorting users
        Comparator<User> userComparator = getUserComparator(sortBy);
        users = users.stream()
                // remove product list from user to avoid unnecessary data exposure
                .peek(user -> user.setProducts(null))
                .sorted(userComparator)
                .collect(Collectors.toList());

        return users;
    }

    // generates comparator for sorting users based on sortBy parameter
    private Comparator<User> getUserComparator(String sortBy) {
        switch (sortBy) {
            case "nameAsc":
                return Comparator.comparing(User::getFirstName);
            case "nameDesc":
                return Comparator.comparing(User::getFirstName).reversed();
            default:
                // default sorting by user ID
                return Comparator.comparing(User::getUserId);
        }
    }
}
