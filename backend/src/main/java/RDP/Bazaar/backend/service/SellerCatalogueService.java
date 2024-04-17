package RDP.Bazaar.backend.service;

import RDP.Bazaar.backend.entity.SellerCatalogue;
import RDP.Bazaar.backend.repository.ISellerCatalogueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellerCatalogueService {
    @Autowired
    ISellerCatalogueRepository sellerCatalogueRepository;

    public List<SellerCatalogue> getAllSellers() {
        return sellerCatalogueRepository.findAll();
    }

    public Optional<SellerCatalogue> findByUserRater(String userRater) {
        return sellerCatalogueRepository.findByUserRater(userRater);
    }

    public List<SellerCatalogue> findByUserRated(String userRated) {
        return sellerCatalogueRepository.findByUserRated(userRated);
    }

    public Optional<SellerCatalogue> findById(long id) {
        return sellerCatalogueRepository.findById(id);
    }

    public SellerCatalogue createCatalogue(SellerCatalogue catalogue) {
        return sellerCatalogueRepository.save(catalogue);
    }
}
