// import necessary modules
import React from "react";

const SearchAndFilterSellers = ({
  search,
  setSearch,
  sortBy,
  setSortBy,
  handleClear,
}) => {
  return (
    <div className="col-md-2">
      {/* search input */}
      <input
        type="text"
        className="form-control"
        placeholder="Search sellers"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* sort by dropdown */}
      <select
        className="form-select mt-3 mb-3"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="usernameAsc">Username: A to Z</option>
        <option value="usernameDesc">Username: Z to A</option>
      </select>

      {/* clear button */}
      <div className="d-grid">
        <button className="btn btn-secondary mb-3" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

// export component
export default SearchAndFilterSellers;
