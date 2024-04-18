package RDP.Bazaar.backend.controller;

import RDP.Bazaar.backend.entity.SellerCatalogue;
import RDP.Bazaar.backend.service.SellerCatalogueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sellerCatalogue")
public class SellerCatalogueController {
    @Autowired
    private SellerCatalogueService sellerCatalogueService;

    @GetMapping
    List<SellerCatalogue> getAllSellers() {
        return sellerCatalogueService.getAllSellers();
    }

    @GetMapping("/searchByRater/{userRater}")
    public ResponseEntity<SellerCatalogue> getCatalogueByUserRater(@PathVariable String userRater) {
        Optional<SellerCatalogue> sellers = sellerCatalogueService.findByUserRater(userRater);

        if (sellers.isPresent()) {
            return new ResponseEntity<>(sellers.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/searchByRated/{userRated}")
    public ResponseEntity<List<SellerCatalogue>> getCatalogueByUserRated(@PathVariable String userRated) {
        List<SellerCatalogue> sellers = sellerCatalogueService.findByUserRated(userRated);

        if (!sellers.isEmpty()) {
            return new ResponseEntity<>(sellers, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SellerCatalogue> getCatalogueById(@PathVariable long id) {
        SellerCatalogue user = sellerCatalogueService.findById(id)
                .orElseThrow(() -> new RuntimeException("Catalogue does not exist with id: " + id));

        return ResponseEntity.ok(user);
    }

//    @PostMapping
//    public SellerCatalogue createCatalogue(@RequestBody SellerCatalogue catalogue) {
//        return sellerCatalogueService.createCatalogue(catalogue);
//    }

    @CrossOrigin
    @PostMapping
    public SellerCatalogue createCatalog(@RequestBody SellerCatalogue catalog)
    {
        return sellerCatalogueService.createCatalogue(catalog);
    }
}
