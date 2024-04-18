// import necessary modules
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigator = useNavigate();

  const studentId = sessionStorage.getItem("studentId");
  const hashedPassword = sessionStorage.getItem("hashedPassword");
  const usrID = sessionStorage.getItem("usrID");
  const usrid = "/edit-profile/" + usrID;
  console.log("current user", sessionStorage.getItem("usrID"));

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    // If user confirms, log out
    if (confirmLogout) {
      // Remove session items
      sessionStorage.removeItem("studentId");
      sessionStorage.removeItem("hashedPassword");
      sessionStorage.removeItem("usrID");
      sessionStorage.removeItem("decryptuserID");
      navigator("/");
    }
  };

  if (!studentId) {
    window.location.href = "/";
  }

  if (studentId) {
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
                {/* "Products" redirects to product catalogue */}
                <li className="nav-item">
                  <Link
                    to="/products"
                    className="nav-link"
                    aria-current="page"
                    exact
                  >
                    Products
                  </Link>
                </li>

                {/* "Sellers" redirects to seller catalogue */}
                <li className="nav-item">
                  <Link
                    to="/sellersCatalog"
                    className="nav-link"
                    aria-current="page"
                    exact
                  >
                    Sellers
                  </Link>
                </li>

                <li className="nav-item">
                  <Link 
                  to ="/product-catalog"
                  className="nav-link"
                  aria-current="page"
                  exact
                  >
                    Product Catalog
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
                  to="/message"
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
                  to={usrid}
                  className="nav-link ms-3"
                  aria-current="page"
                  exact
                >
                  <i className="bi bi-person"></i>
                </Link>

                <button
                  className="nav-link ms-3"
                  aria-label="Logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
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
  }
};

// export navbar component
export default Navbar;
