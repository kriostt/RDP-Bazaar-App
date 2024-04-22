package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.Product;
import RDP.Bazaar.backend.repository.IProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductSrv
{

    @Autowired
    IProductRepo iProductRepo;
    public List<Product> getAllItems() {
        return iProductRepo.findAll();
    }

    public List<Product> getProductsByUserId(Long sellerid) {
        return iProductRepo.findBySellerId(sellerid);
    }

    public List<Product> findProductById(Long productid) {
        return iProductRepo.findProductByProductid(productid);
    }
}
