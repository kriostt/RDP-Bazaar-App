package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController // Indicates that this class is a controller and the methods return JSON responses
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    // API endpoint for getting all users
    @GetMapping("/")
    public List<User> getALlUsers() {
        return userService.getAllUsers();
    }

    // Endpoint to save a new user
    @PostMapping("/save")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user); // Delegate the saving operation to the UserService
    }

    // Endpoint to retrieve a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id); // Retrieve user by ID from UserService
        if (user != null ) {
            return ResponseEntity.ok(user); // Return user if found
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to update a user by ID
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser); // Update user by ID using UserService
        if (user != null) {
            return ResponseEntity.ok(user); // Return updated user if successful
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to retrieve the current password of a user by ID
    @GetMapping("/user/current-password/{id}")
    public ResponseEntity<String> getCurrentPassword(@PathVariable Long id) {
        String currentPassword = userService.getCurrentPassword(id); // Retrieve current password by user ID
        if (currentPassword != null) {
            return ResponseEntity.ok(currentPassword); // Return current password if found
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to change the password of a user by ID
    @PutMapping("/user/change-password/{id}")
    public ResponseEntity<String> changeUserPassword(@PathVariable Long id, @RequestBody Map<String, String> passwordMap) {
        String currentPassword = passwordMap.get("currentPassword");
        String newPassword = passwordMap.get("newPassword");

        // Validate input parameters
        if (currentPassword == null || currentPassword.isEmpty() || newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body("Current password and new password cannot be empty");
        }

        // Delegate password change operation to the UserService
        String result = userService.changeUserPassword(id, currentPassword, newPassword);

        // Return appropriate response based on the result of the password change operation
        if (result.equals("Password Changed")) {
            return ResponseEntity.ok(result);
        } else if (result.equals("Incorrect current password")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }
}
