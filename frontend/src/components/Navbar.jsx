import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, token, logout, isAdmin } = useAuth();
  const { cartItems } = useCart();
  const [term, setTerm] = useState("");

  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = term.trim();
    if (trimmed) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <div className="navbar-top">
        <div className="container navbar-top__content">
          <div className="navbar-top__left">
            <Link to="/" className="navbar-logo">
              ShopAll
            </Link>
          </div>
          <div className="navbar-top__center">
            <form onSubmit={handleSubmit} className="navbar-search">
              <input
                type="text"
                placeholder="Search products..."
                value={term}
                onChange={(event) => setTerm(event.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="navbar-top__right navbar-actions">
            <Link to="/cart">
              Cart {totalCount > 0 && <span className="badge">{totalCount}</span>}
            </Link>
            {!token && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            {token && (
              <>
                <span>{user?.name || "Account"}</span>
                <Link to="/orders">My Orders</Link>
                <button type="button" onClick={handleLogout} className="btn-accent">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="container navbar-bottom__content">
          <nav className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/?category=Electronics">Electronics</Link>
            <Link to="/?category=Clothing">Clothing</Link>
            <Link to="/?category=Books">Books</Link>
            <Link to="/?category=Sports">Sports</Link>
            <Link to="/?category=Home">Home</Link>
          </nav>
          <div className="navbar-actions">
            {isAdmin && (
              <Link to="/admin/add-product" className="navbar-add">
                + Add Product
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
