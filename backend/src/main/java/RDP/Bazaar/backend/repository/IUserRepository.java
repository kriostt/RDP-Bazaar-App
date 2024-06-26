package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository; // Importing JpaRepository interface from Spring Data JPA
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository; // Importing Repository annotation from Spring Framework

import java.util.Optional;

@Repository // Indicates that this interface is a Spring Data repository
public interface IUserRepository  extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    // This interface extends JpaRepository, providing CRUD functionalities for User entity with primary key of type Integer

    // JpaSpecificationExecutor allows execution of dynamic queries using Specifications
}
