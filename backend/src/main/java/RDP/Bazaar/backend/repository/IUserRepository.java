package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

// manages User entities
@Repository // automatically detected and configured by Spring Data JPA
public interface IUserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    // JpaRepository<User, Long> provides CRUD operations for User entity

    // JpaSpecificationExecutor allows execution of dynamic queries using Specifications
}