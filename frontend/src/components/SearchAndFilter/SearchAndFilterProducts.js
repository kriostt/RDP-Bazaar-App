// import necessary modules
import React from "react";

const SearchAndFilterProducts = ({
  search,
  setSearch,
  category,
  setCategory,
  productCondition,
  setProductCondition,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  handleClear,
}) => {
  return (
    <>
      {/* search input */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* category dropdown */}
      <select
        className="form-select mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="appliances">Appliances</option>
        <option value="clothing">Clothing</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
        <option value="miscellaneous">Miscellaneous</option>
        <option value="textbooks">Textbooks</option>
        <option value="vehicles">Vehicles</option>
      </select>

      {/* condition dropdown */}
      <select
        className="form-select mb-3"
        value={productCondition}
        onChange={(e) => setProductCondition(e.target.value)}
      >
        <option value="">All Conditions</option>
        <option value="new">New</option>
        <option value="used - like new">Used - Like New</option>
        <option value="used - good">Used - Good</option>
        <option value="used - fair">Used - Fair</option>
      </select>

      {/* price range filter */}
      <div className="input-group mb-3">
        <span className="input-group-text">$</span>

        <input
          type="text"
          className="form-control"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => {
            // remove any non-digit characters (including -) from the input value
            const value = e.target.value.replace(/[^0-9]/g, "");
            setMinPrice(value);
          }}
        />

        <span className="input-group-text">to</span>

        <input
          type="text"
          className="form-control"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => {
            // remove any non-digit characters (including -) from the input value
            const value = e.target.value.replace(/[^0-9]/g, "");
            setMaxPrice(value);
          }}
        />
      </div>

      {/* sort by dropdown */}
      <select
        className="form-select mb-3"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="datePostedAsc">Date Posted: Old to New</option>
        <option value="datePostedDesc">Date Posted: New to Old</option>
      </select>

      {/* clear button */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary mb-3" onClick={handleClear}>
          Clear
        </button>
      </div>
    </>
  );
};

// export component
export default SearchAndFilterProducts;
