// import necessary modules
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // JSX for navbar component
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid px-0">
          {/* logo takes user back to home page when clicked */}
          <Link
            to="/"
            className="navbar-brand ms-3"
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            RDP BAZAAR
          </Link>

          {/* navbar links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
              {/* "Products" redirects to product catalogue */}
              <li className="nav-item dropdown">
                <Link
                  to="/products"
                  className="nav-link dropdown-toggle"
                  role="button"
                  aria-expanded="false"
                >
                  Products
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/appliances" className="dropdown-item">
                      Appliances
                    </Link>
                  </li>
                  <li>
                    <Link to="/clothing" className="dropdown-item">
                      Clothing
                    </Link>
                  </li>
                  <li>
                    <Link to="/electronics" className="dropdown-item">
                      Electronics
                    </Link>
                  </li>
                  <li>
                    <Link to="/furniture" className="dropdown-item">
                      Furniture
                    </Link>
                  </li>
                  <li>
                    <Link to="/miscellaneous" className="dropdown-item">
                      Miscellaneous
                    </Link>
                  </li>
                  <li>
                    <Link to="/textbooks" className="dropdown-item">
                      Textbooks
                    </Link>
                  </li>
                  <li>
                    <Link to="/vehicles" className="dropdown-item">
                      Vehicles
                    </Link>
                  </li>
                </ul>
              </li>

              {/* "Sellers" redirects to seller catalogue */}
              <li className="nav-item">
                <Link
                  to="/sellers"
                  className="nav-link"
                  aria-current="page"
                  exact
                >
                  Sellers
                </Link>
              </li>

              {/* "Insights" redirects to insights page that shows user interactions with application */}
              <li className="nav-item">
                <Link
                  to="/insights"
                  className="nav-link"
                  aria-current="page"
                  exact
                >
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* navbar icons */}
          <div>
            <div class="navbar-nav d-flex flex-row">
              {/* chat icon redirects to chat page */}
              <Link
                to="/chat"
                className="nav-link ms-3"
                aria-current="page"
                exact
              >
                <i class="bi bi-chat"></i>
              </Link>

              {/* bell icon redirects to notifications page */}
              <Link
                to="/notifications"
                className="nav-link ms-3"
                aria-current="page"
                exact
              >
                <i class="bi bi-bell"></i>
              </Link>

              {/* person icon redirects to profile page */}
              <Link
                to="/edit-profile"
                className="nav-link ms-3"
                aria-current="page"
                exact
              >
                <i class="bi bi-person"></i>
              </Link>
            </div>
          </div>

          {/* button to collapse behaviour of navbar on smaller screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

// export navbar component
export default Navbar;
