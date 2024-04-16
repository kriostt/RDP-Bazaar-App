package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecifications {
    // method to generate specification for searching and filtering products
    public static Specification<Product> searchAndFilterProducts(
            String search, String productCondition, Double minPrice, Double maxPrice) {

        // initialize specification with a null predicate
        Specification<Product> specification = Specification.where(null);

        // add specification for searching by name or description if search parameter is provided
        if (search != null && !search.isBlank()) {
            specification = specification.and(nameOrDescriptionContainsIgnoreCase(search));
        }

        // add specification for filtering by product condition if productCondition parameter is provided
        if (productCondition != null && !productCondition.isBlank()) {
            specification = specification.and(productConditionEquals(productCondition));
        }

        // add specification for filtering by price range if minPrice or maxPrice parameters are provided
        if ((minPrice != null && minPrice >= 0) || (maxPrice != null && maxPrice >= 0)) {
            specification = specification.and(priceBetween(minPrice, maxPrice));
        }

        return specification;
    }

    // specifications to search for products where name or description contains the given search string
    private static Specification<Product> nameOrDescriptionContainsIgnoreCase(String search) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.or(
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("name")),
                                "%" + search.toLowerCase() + "%"),
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("description")),
                                "%" + search.toLowerCase() + "%")
                );
    }

    // specifications to filter products by product condition
    private static Specification<Product> productConditionEquals(String productCondition) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("productCondition")),
                        productCondition.toLowerCase());
    }

    // specifications to filter products by price range
    private static Specification<Product> priceBetween(Double minPrice, Double maxPrice) {
        return (root, query, criteriaBuilder) -> {
            if (minPrice != null && maxPrice != null) {
                // return specification for price between minPrice and maxPrice
                return criteriaBuilder.between(root.get("price"), minPrice, maxPrice);
            } else if (minPrice != null) {
                // return specification for price greater than or equal to minPrice
                return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice);
            } else {
                // return specification for price less than or equal to maxPrice
                return criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice);
            }
        };
    }
}
