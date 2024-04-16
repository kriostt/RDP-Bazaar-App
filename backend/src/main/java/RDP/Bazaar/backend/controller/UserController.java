package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    // automatic injection of UserService instance
    @Autowired
    private UserService userService;

    // API endpoint for getting all users
    @GetMapping("/")
    public List<User> getALlUsers() {
        return userService.getAllUsers();
    }

    // API endpoint for searching and filtering users
    @GetMapping("/searchAndFilter")
    public List<User> searchAndFilterUsers(@RequestParam(required = false) String search,
                                           @RequestParam(required = false) String sortBy) {
        return userService.searchAndFilterUsers(search, sortBy);
    }
}
