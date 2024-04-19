package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.repository.IUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

public class UserServiceTest {

    @Mock
    IUserRepository repository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserById_existingUser_shouldReturnUserWithoutProducts() {
        // Arrange
        Long userId = 1L;
        // Create an existing user with an empty product list
        User existingUser = new User();
        existingUser.setProducts(new ArrayList<>());
        given(repository.findById(userId)).willReturn(Optional.of(existingUser));

        // Act
        User user = userService.getUserById(userId);

        // Assert
        assertNotNull(user);
        // Ensure the products list is null (cleared to avoid unnecessary data exposure)
        assertNull(user.getProducts());
        // Verify the returned user matches the expected existing user
        assertEquals(existingUser, user);

    }

    @Test
    void getUserById_nonExistingUser_shouldReturnNull() {
        // Arrange
        Long userId = 1L;
        // Simulate no user found in the repository
        given(repository.findById(userId)).willReturn(Optional.empty());

        // Act
        User user = userService.getUserById(userId);

        // Assert
        assertNull(user);
    }

    @Test
    void updateUser_existingUser_shouldReturnUpdatedUser() {
        // Arrange
        Long userId = 1L;
        // Create an existing user
        User existingUser = new User();
        existingUser.setUserId(userId);
        existingUser.setUsername("username");
        existingUser.setFirstName("firstName");
        existingUser.setLastName("lastName");
        existingUser.setPhone("phone");
        existingUser.setEmail("email");
        existingUser.setPassword("password");
        existingUser.setImgurl("imgurl");

        // Set up an updated user object
        User updatedUser = new User();
        updatedUser.setUserId(userId);
        updatedUser.setUsername("updatedUsername");
        updatedUser.setFirstName("updatedFirstName");
        updatedUser.setLastName("updatedLastName");
        updatedUser.setPhone("updatedPhone");
        updatedUser.setEmail("updatedEmail");
        updatedUser.setPassword("updatedPassword");
        updatedUser.setImgurl("updatedImgurl");

        // Simulate the existence of the user in the repository
        given(repository.existsById(userId)).willReturn(true);
        // Mock the save operation to return the updated user
        given(repository.save(updatedUser)).willReturn(updatedUser);

        // Act
        User result = userService.updateUser(userId, updatedUser);

        // Assert
        assertNotNull(result);
        // Verify the returned user matches the updated user
        assertEquals(updatedUser, result);
        // Verify that the save operation was called with the updated user
        verify(repository).save(updatedUser);
    }

    @Test
    void updateUser_nonExistingUser_shouldReturnNull() {
        // Arrange
        Long userId = 1L;
        // Set up an updated user object
        User updatedUser = new User();
        updatedUser.setUserId(userId);
        updatedUser.setUsername("updatedUsername");
        updatedUser.setFirstName("updatedFirstName");
        updatedUser.setLastName("updatedLastName");
        updatedUser.setPhone("updatedPhone");
        updatedUser.setEmail("updatedEmail");
        updatedUser.setPassword("updatedPassword");
        updatedUser.setImgurl("updatedImgurl");

        // Simulate the non-existence of the user in the repository
        given(repository.existsById(userId)).willReturn(false);

        // Act
        User result = userService.updateUser(userId, updatedUser);

        // Assert
        assertNull(result);
        // Verify that the save operation was never called as the user doesn't exist
        verify(repository, never()).save(updatedUser);
    }

    @Test
    void getCurrentPassword_existingUser_shouldReturnPassword() {
        // Arrange
        Long userId = 1L;
        String password = "password";
        // Create an existing user with a password
        User existingUser = new User();
        existingUser.setUserId(userId);
        existingUser.setUsername("username");
        existingUser.setFirstName("firstName");
        existingUser.setLastName("lastName");
        existingUser.setPhone("phone");
        existingUser.setEmail("email");
        existingUser.setPassword(password);
        existingUser.setImgurl("imgurl");

        // Simulate finding the existing user in the repository
        given(repository.findById(userId)).willReturn(Optional.of(existingUser));

        // Act
        String result = userService.getCurrentPassword(userId);

        // Assert
        assertEquals(password, result);
    }

    @Test
    void getCurrentPassword_nonExistingUser_shouldReturnNull() {
        // Arrange
        Long userId = 1L;
        // Simulate no user found in the repository
        given(repository.findById(userId)).willReturn(Optional.empty());

        // Act
        String result = userService.getCurrentPassword(userId);

        // Assert
        assertNull(result);
    }

    @Test
    void changeUserPassword_existingUser_correctCurrentPassword_shouldChangePassword() {
        // Arrange
        Long userId = 1L;
        String currentPassword = "currentPassword";
        String newPassword = "newPassword";
        // Create an existing user with a current password
        User user = new User();
        user.setUserId(userId);
        user.setUsername("username");
        user.setPassword(currentPassword);
        // Simulate finding the existing user in the repository
        given(repository.findById(userId)).willReturn(Optional.of(user));

        // Act
        String result = userService.changeUserPassword(userId, currentPassword, newPassword);

        // Assert
        assertEquals("Password Changed", result);
        // Verify that the user's password is updated to the new password
        assertEquals(newPassword, user.getPassword());
        // Verify that the user's details are saved
        verify(repository).save(user);
    }

    @Test
    void changeUserPassword_nonExistingUser_shouldReturnErrorMessage() {
        // Arrange
        Long userId = 1L;
        String currentPassword = "currentPassword";
        String newPassword = "newPassword";
        // Simulate no user found in the repository
        given(repository.findById(userId)).willReturn(Optional.empty());

        // Act
        String result = userService.changeUserPassword(userId, currentPassword, newPassword);

        // Assert
        // Verify that an error message is returned indicating the user was not found
        assertEquals("User not found", result);
        // Ensure that the save method is not called since the user does not exist
        verify(repository, never()).save(any());
    }
}
