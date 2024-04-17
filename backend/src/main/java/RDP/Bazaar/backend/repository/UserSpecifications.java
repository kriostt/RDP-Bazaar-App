package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecifications {
    // method to generate specifications for searching and filtering users
    public static Specification<User> searchAndFilterUsers(String search) {

        // initialize specifications with a null predicate
        Specification<User> specification = Specification.where(null);

        // add specification for searching by username, firstName, or lastName if search parameter is provided
        if (search != null && !search.isBlank()) {
            specification = specification.and(nameContainsIgnoreCase(search));
        }

        return specification;
    }

    // specifications to search for users where username, firstName, or lastName contains the given search string
    private static Specification<User> nameContainsIgnoreCase(String search) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.or(
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("username")),
                                "%" + search.toLowerCase() + "%"),
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("firstName")),
                                "%" + search.toLowerCase() + "%"),
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("lastName")),
                                "%" + search.toLowerCase() + "%")

                );
    }
}
