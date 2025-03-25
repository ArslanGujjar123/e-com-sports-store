import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.css";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const NavBar = ({userRole,isAuthenticated}) => {
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  
  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  
  return (
    <Navbar
      fixed="top"
      expand="md"
      className={isFixed ? "navbar fixed" : "navbar"}
    >
      <Container className="navbar-container">
      <Navbar.Brand to="/">
        <img src={logo} alt="" className="logo" />

        <h1 className="logo">Imran Sports</h1>
      </Navbar.Brand>

        {/* Media cart and toggle */}
        <div className="d-flex">
          
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => {
              setExpand(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {isAuthenticated && userRole==='admin'?
            (
              <>

            <Nav.Item>
              <Link
                aria-label="Go to Shop Page"
                className="navbar-link"
                to="/admin/products"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Products</span>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                aria-label="Go to Cart Page"
                className="navbar-link"
                to="/admin/orders"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Orders</span>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                aria-label="Go to Home Page"
                className="navbar-link"
                to="/admin/users"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Users</span>
              </Link>
            </Nav.Item>
               
                <Nav.Item>
                <Link
                aria-label="Go to Home Page"
                className="navbar-link"
                to="/logout"
               
              >
                <span className="nav-link-label">Logout</span>
              </Link>
                </Nav.Item>
              </>
            ):(
              <>
            <Nav.Item>
              <Link
                aria-label="Go to Home Page"
                className="navbar-link"
                to="/"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Home</span>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                aria-label="Go to Shop Page"
                className="navbar-link"
                to="/shop"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Shop</span>
              </Link>
            </Nav.Item>

            <Nav.Item className="expanded-cart">
            
              <Link
                aria-label="Go to Cart Page"
                to="/cart"
                className="cart"
                data-num={cartList.length}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="nav-icon"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </Link>
            </Nav.Item>
            </>
            )}
             {isAuthenticated && userRole==='user' && (
              <>
                <Nav.Item>
                <Link
                aria-label="Go to Orders Page"
                className="navbar-link"
                to="/order-summary"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Orders</span>
              </Link>
                </Nav.Item>
                <Nav.Item>
                <Link
                aria-label="Go to Login Page"
                className="navbar-link"
                to="/logout"
               
              >
                <span className="nav-link-label">Logout</span>
              </Link>
                </Nav.Item>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Nav.Item>
                <Link
                aria-label="Go to Login Page"
                className="navbar-link"
                to="/login"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Login</span>
              </Link>
                </Nav.Item>
                <Nav.Item>
                <Link
                aria-label="Go to Register Page"
                className="navbar-link"
                to="/register"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Register</span>
              </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
