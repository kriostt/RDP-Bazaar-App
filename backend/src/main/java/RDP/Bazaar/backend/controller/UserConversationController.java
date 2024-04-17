package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.UserConversation;
import RDP.Bazaar.backend.service.UserConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversation")
public class UserConversationController {
    @Autowired
    private UserConversationService userConversationService;

    @GetMapping
    public List<UserConversation> getAllConversations() {
        return userConversationService.getAllConversations();
    }

    // GET conversations by senderUserId
    @GetMapping("/by-sender/{senderUserId}")
    public List<UserConversation> getConversationsBySenderUserId(@PathVariable Long senderUserId) {
        return userConversationService.findBySenderUserUserIdOrReceiverUserUserId(senderUserId, senderUserId);
    }

    @PostMapping
    public UserConversation createConversation(@RequestBody UserConversation convo) {
        return userConversationService.saveConvo(convo);
    }
}
