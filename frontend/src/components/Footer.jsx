import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('subscribed:', email);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/?category=Electronics">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/?category=Electronics">Electronics</Link></li>
              <li><Link to="/?category=Clothing">Clothing</Link></li>
              <li><Link to="/?category=Books">Books</Link></li>
              <li><Link to="/?category=Sports">Sports</Link></li>
              <li><Link to="/?category=Home">Home</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Info</h4>
            <p>@ support@shopall.com</p>
            <p># +1 (555) 123-4567</p>
            <p>* 123 Commerce St, Tech City</p>
          </div>
          <div className="footer-column">
            <h4>Newsletter</h4>
            <p>Subscribe for the latest deals and updates</p>
            {subscribed ? (
              <p className="footer-subscribed">Subscribed!</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn-accent">Subscribe</button>
              </form>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 ShopAll. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
