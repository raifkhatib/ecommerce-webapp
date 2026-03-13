import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, token, logout, isAdmin } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [term, setTerm] = useState('');

  const totalCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setUserDropdownOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      navigate(`/?search=${encodeURIComponent(term.trim())}`);
      setTerm('');
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="container navbar__content">
        <Link to="/" className="navbar-logo">ShopAll</Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li className="nav-dropdown-wrapper">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              Products
            </button>
            {dropdownOpen && (
              <ul className="nav-dropdown">
                <li><Link to="/?category=Electronics">Electronics</Link></li>
                <li><Link to="/?category=Clothing">Clothing</Link></li>
                <li><Link to="/?category=Books">Books</Link></li>
                <li><Link to="/?category=Sports">Sports</Link></li>
                <li><Link to="/?category=Home">Home</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {isAdmin && <li><Link to="/admin/add-product">+ Add Product</Link></li>}
        </ul>

        <div className="nav-icons">
          <div className="search-wrapper">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(!searchOpen)}>Search</button>
            {searchOpen && (
              <form onSubmit={handleSubmit} className="search-expandable">
                <input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                />
                <button type="submit" className="btn-primary">Go</button>
              </form>
            )}
          </div>

          <Link to="/cart" className="nav-icon-btn cart-icon">
            Cart
            {totalCount > 0 && <span className="badge">{totalCount}</span>}
          </Link>

          <div className="user-dropdown-wrapper">
            <button className="nav-icon-btn" onClick={() => setUserDropdownOpen(!userDropdownOpen)}>Account</button>
            {userDropdownOpen && (
              <div className="user-dropdown">
                {!token ? (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                ) : (
                  <>
                    <span className="user-dropdown__name">{user?.name || 'Account'}</span>
                    <Link to="/orders">My Orders</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'X' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <form onSubmit={handleSubmit} className="mobile-search">
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search products..."
            />
            <button type="submit">Search</button>
          </form>
          <Link to="/">Home</Link>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>Products v</button>
          {dropdownOpen && (
            <div className="mobile-categories">
              <Link to="/?category=Electronics">Electronics</Link>
              <Link to="/?category=Clothing">Clothing</Link>
              <Link to="/?category=Books">Books</Link>
              <Link to="/?category=Sports">Sports</Link>
              <Link to="/?category=Home">Home</Link>
            </div>
          )}
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          {isAdmin && <Link to="/admin/add-product">+ Add Product</Link>}
          <Link to="/cart">Cart Cart {totalCount > 0 && <span className="badge">{totalCount}</span>}</Link>
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span style={{ color: '#f0a500', fontWeight: 'bold', padding: '0.5rem 0' }}>{user?.name}</span>
              <Link to="/orders">My Orders</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
