package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IUserRepository;
import RDP.Bazaar.backend.repository.UserSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

// handles business logic related to User entities
@Service
public class UserService {
    // automatic injection of IUserRepository instance
    @Autowired
    private IUserRepository userRepository;

    // get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // get users based on search and filter criteria
    public List<User> searchAndFilterUsers(String search, String sortBy) {
        // find users based on search and filter criteria using specifications
        List<User> users = userRepository.findAll(UserSpecifications.searchAndFilterUsers(search));

        // sort users based on provided sortBy parameter
        if ("usernameAsc".equals(sortBy)) {
            users.sort(Comparator.comparing(User::getUsername));
        } else if ("usernameDesc".equals(sortBy)) {
            users.sort(Comparator.comparing(User::getUsername).reversed());
        }

        return users;
    }
}
