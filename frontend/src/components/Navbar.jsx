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
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">E-Commerce</Link>
        <form onSubmit={handleSubmit} className="navbar__search">
          <input
            type="text"
            placeholder="Search products..."
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="navbar__right">
        {isAdmin && (
          <Link to="/admin/add-product">Add Product</Link>
        )}
        <Link to="/cart" className="navbar__cart">
          Cart
          {totalCount > 0 && <span className="navbar__badge">{totalCount}</span>}
        </Link>
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {token && (
          <>
            <span className="navbar__user">{user?.name || "Account"}</span>
            <Link to="/orders">My Orders</Link>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}