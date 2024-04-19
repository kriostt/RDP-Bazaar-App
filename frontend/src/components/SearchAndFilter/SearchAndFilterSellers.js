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
    <>
      <div className="row">
        {/* search input */}
        <div className="col-lg-9 col-md-8 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search sellers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* sort by dropdown */}
        <div className="col-lg-3 col-md-4 mb-3">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary mb-4" onClick={handleClear}>
          Clear
        </button>
      </div>
    </>
  );
};

// export component
export default SearchAndFilterSellers;
