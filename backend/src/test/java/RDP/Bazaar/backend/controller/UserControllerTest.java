package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.User;
import RDP.Bazaar.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.HashMap;
import java.util.Map;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void getUserById_existingUser_shouldReturnUser() throws Exception {
        // Arrange
        Long userId = 1L;
        User user = new User();
        user.setUserId(userId);
        user.setUsername("username");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPhone("1234567890");
        user.setEmail("john.doe@example.com");
        user.setPassword("password");
        user.setImgurl("https://example.com/image.jpg");

        given(userService.getUserById(userId)).willReturn(user);

        // Act & Assert
        mockMvc.perform(get("/api/users/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"userId\":1,\"username\":\"username\",\"firstName\":\"John\",\"lastName\":\"Doe\",\"phone\":\"1234567890\",\"email\":\"john.doe@example.com\",\"password\":\"password\",\"imgurl\":\"https://example.com/image.jpg\"}"));
    }

    @Test
    void getUserById_nonExistingUser_shouldReturnNotFound() throws Exception {
        // Arrange
        Long userId = 1L;
        given(userService.getUserById(userId)).willReturn(null);

        // Act & Assert
        mockMvc.perform(get("/api/users/{id}", userId))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateUserById_existingUser_shouldReturnUpdatedUser() throws Exception {
        // Arrange
        Long userId = 1L;
        User updatedUser = new User();
        updatedUser.setUserId(userId);
        updatedUser.setUsername("updatedUsername");
        updatedUser.setFirstName("updatedFirstName");
        updatedUser.setLastName("updatedLastName");
        updatedUser.setPhone("updatedPhone");
        updatedUser.setEmail("updatedEmail");
        updatedUser.setPassword("updatedPassword");
        updatedUser.setImgurl("updatedImgurl");

        given(userService.updateUser(userId, updatedUser)).willReturn(updatedUser);

        // Act & Assert
        mockMvc.perform(put("/api/users/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":1,\"username\":\"updatedUsername\",\"firstName\":\"updatedFirstName\",\"lastName\":\"updatedLastName\",\"phone\":\"updatedPhone\",\"email\":\"updatedEmail\",\"password\":\"updatedPassword\",\"imgurl\":\"updatedImgurl\"}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"userId\":1,\"username\":\"updatedUsername\",\"firstName\":\"updatedFirstName\",\"lastName\":\"updatedLastName\",\"phone\":\"updatedPhone\",\"email\":\"updatedEmail\",\"password\":\"updatedPassword\",\"imgurl\":\"updatedImgurl\"}"));
    }

    @Test
    void updateUserById_nonExistingUser_shouldReturnNotFound() throws Exception {
        // Arrange
        Long userId = 1L;
        User updatedUser = new User();
        updatedUser.setUserId(userId);
        updatedUser.setUsername("updatedUsername");

        given(userService.updateUser(userId, updatedUser)).willReturn(null);

        // Act & Assert
        mockMvc.perform(put("/api/users/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":1,\"username\":\"updatedUsername\"}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getCurrentPassword_existingUser_shouldReturnPassword() throws Exception {
        // Arrange
        Long userId = 1L;
        String currentPassword = "password";
        given(userService.getCurrentPassword(userId)).willReturn(currentPassword);

        // Act & Assert
        mockMvc.perform(get("/api/users/user/current-password/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(content().string(currentPassword));
    }

    @Test
    void getCurrentPassword_nonExistingUser_shouldReturnNotFound() throws Exception {
        // Arrange
        Long userId = 1L;
        given(userService.getCurrentPassword(userId)).willReturn(null);

        // Act & Assert
        mockMvc.perform(get("/api/users/user/current-password/{id}", userId))
                .andExpect(status().isNotFound());
    }

    @Test
    void changeUserPassword_validRequest_shouldReturnPasswordChanged() throws Exception {
        // Arrange
        Long userId = 1L;
        String currentPassword = "currentPassword";
        String newPassword = "newPassword";
        Map<String, String> passwordMap = new HashMap<>();
        passwordMap.put("currentPassword", currentPassword);
        passwordMap.put("newPassword", newPassword);
        given(userService.changeUserPassword(userId, currentPassword, newPassword)).willReturn("Password Changed");

        // Act & Assert
        mockMvc.perform(put("/api/users/user/change-password/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"currentPassword\":\"currentPassword\",\"newPassword\":\"newPassword\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Password Changed"));
    }

    @Test
    void changeUserPassword_emptyCurrentPassword_shouldReturnBadRequest() throws Exception {
        // Arrange
        Long userId = 1L;
        String newPassword = "newPassword";
        Map<String, String> passwordMap = new HashMap<>();
        passwordMap.put("currentPassword", ""); // Empty current password
        passwordMap.put("newPassword", newPassword);

        // Act & Assert
        mockMvc.perform(put("/api/users/user/change-password/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"currentPassword\":\"\",\"newPassword\":\"newPassword\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Current password and new password cannot be empty"));
    }

    @Test
    void changeUserPassword_emptyNewPassword_shouldReturnBadRequest() throws Exception {
        // Arrange
        Long userId = 1L;
        String currentPassword = "currentPassword";
        Map<String, String> passwordMap = new HashMap<>();
        passwordMap.put("currentPassword", currentPassword);
        passwordMap.put("newPassword", ""); // Empty new password

        // Act & Assert
        mockMvc.perform(put("/api/users/user/change-password/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"currentPassword\":\"currentPassword\",\"newPassword\":\"\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Current password and new password cannot be empty"));
    }

    @Test
    void changeUserPassword_incorrectCurrentPassword_shouldReturnUnauthorized() throws Exception {
        // Arrange
        Long userId = 1L;
        String currentPassword = "currentPassword";
        String newPassword = "newPassword";
        Map<String, String> passwordMap = new HashMap<>();
        passwordMap.put("currentPassword", currentPassword);
        passwordMap.put("newPassword", newPassword);
        given(userService.changeUserPassword(userId, currentPassword, newPassword)).willReturn("Incorrect current password");

        // Act & Assert
        mockMvc.perform(put("/api/users/user/change-password/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"currentPassword\":\"currentPassword\",\"newPassword\":\"newPassword\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Incorrect current password"));
    }
}
