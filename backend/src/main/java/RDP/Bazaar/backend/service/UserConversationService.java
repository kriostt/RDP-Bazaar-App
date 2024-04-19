package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.UserConversation;
import RDP.Bazaar.backend.repository.IUserConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserConversationService {
    @Autowired
    IUserConversationRepository userConversationRepository;

    public List<UserConversation> getAllConversations() {
        return userConversationRepository.findAll();
    }

    public List<UserConversation> findBySenderUserUserIdOrReceiverUserUserId(Long senderUserId, Long receiverUserId) {
        return userConversationRepository.findBySenderUserUserIdOrReceiverUserUserId(senderUserId, receiverUserId);
    }

    public UserConversation saveConvo(UserConversation convo) {
        return userConversationRepository.save(convo);
    }
}
