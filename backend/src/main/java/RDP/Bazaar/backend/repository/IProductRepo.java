package RDP.Bazaar.backend.repository;

import RDP.Bazaar.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IProductRepo extends JpaRepository<Product,Long>
{
    @Query("SELECT p FROM Product p WHERE p.sellerid = :sellerid")
    List<Product> findBySellerId(Long sellerid);

    @Query("SELECT p FROM Product p WHERE p.productid = :productid")
    List<Product> findProductByProductid(Long productid);


}
