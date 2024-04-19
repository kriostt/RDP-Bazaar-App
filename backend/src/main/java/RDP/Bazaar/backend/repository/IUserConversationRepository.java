package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.UserConversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUserConversationRepository extends JpaRepository<UserConversation, Long> {
    List<UserConversation> findBySenderUserUserIdOrReceiverUserUserId(Long senderUserId, Long receiverUserId);
}
