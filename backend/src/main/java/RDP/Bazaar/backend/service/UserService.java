package RDP.Bazaar.backend.service;
import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IUserRepository;
import RDP.Bazaar.backend.repository.UserSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service // Indicates that this class is a service component in the Spring application context
public class UserService {

    @Autowired
    IUserRepository repository;

    // get all users
    public List<User> getAllUsers() {
        List<User> users = repository.findAll();

        // remove product list from each user
        users.forEach(user -> user.setProducts(null));

        return users;
    }

    // Method to save a user
    public User saveUser(User user) {
       return repository.save(user); // Save the user using the repository
    }

    // Method to get a user by ID
    public User getUserById(Long id) {
        return repository.findAll().stream()
                .filter(user -> Long.valueOf(user.getUserId()).equals(id))
                .peek(user -> user.setProducts(null)) // Clear products to avoid unnecessary data exposure
                .findFirst()
                .orElse(null); // Return null if user with the given ID doesn't exist
    }

    // Method to update a user by ID
    public User updateUser(Long id, User updatedUser) {
        if (repository.existsById(id)) { // Check if the user with the given ID exists
            updatedUser.setUserId(id); // Set the ID of the updated user
            return repository.save(updatedUser); // Save the updated user using the repository
        } else {
            return null; // Return null if the user with the given ID doesn't exist
        }
    }

    // Method to get the current password of a user by ID
    public String getCurrentPassword(Long id) {
        return repository.findById(id)
                .map(User::getPassword) // Retrieve the password if the user exists
                .orElse(null); // Return null if user with the given ID doesn't exist
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

    public List<User> findAll() {
        return repository.findAll();
    }
}
