package RDP.Bazaar.backend.service;
import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IUserRepository;
import RDP.Bazaar.backend.repository.UserSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service // Indicates that this class is a service component in the Spring application context
public class UserService {

    @Autowired
    IUserRepository repository;

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

    // Method to save a user
    public String saveUser(User user) {
        repository.save(user); // Save the user using the repository
        return "User Saved";
    }

    // Method to get a user by ID
    public Optional<User> getUserById(Long id) {
        return repository.findById(id); // Retrieve the user by ID using the repository
    }

    // Method to update a user by ID
    public User updateUser(Long id, User updatedUser) {
        if (repository.existsById(id)) { // Check if the user with the given ID exists
            updatedUser.setId(id); // Set the ID of the updated user
            return repository.save(updatedUser); // Save the updated user using the repository
        } else {
            return null; // Return null if the user with the given ID doesn't exist
        }
    }

    // Method to get the current password of a user by ID
    public String getCurrentPassword(Long id) {
        User user = repository.findById(id).orElse(null);
        return (user != null) ? user.getPassword() : null;
    }

    // Method to change user's password
    public String changeUserPassword(Long id, String currentPassword, String newPassword) {
        User user = repository.findById(id).orElse(null);
        if (user != null) {
            String storedPassword = user.getPassword();
            // Check if the current password matches the stored password
            if (storedPassword.equals(currentPassword)) {
                // Set the new password directly without hashing
                user.setPassword(newPassword);
                repository.save(user);
                return "Password Changed";
            } else {
                return "Incorrect current password";
            }
        } else {
            return "User not found";
        }
    }
}
