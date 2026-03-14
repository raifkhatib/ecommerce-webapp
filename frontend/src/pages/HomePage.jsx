import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import ProductCard from "../components/ProductCard.jsx";

const categories = [
  { name: 'Electronics', icon: '💻', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop' },
  { name: 'Clothing', icon: '👕', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop' },
  { name: 'Books', icon: '📚', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop' },
  { name: 'Sports', icon: '⚽', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&h=300&fit=crop' },
  { name: 'Home', icon: '🏠', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
];

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get('/products').then(({ data }) => setAllProducts(data)).catch(() => {});
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';

        let url = '/products';
        const params = [];
        if (search) params.push(`search=${encodeURIComponent(search)}`);
        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (params.length > 0) url += `?${params.join('&')}`;

        const { data } = await axiosInstance.get(url);
        if (isActive) {
          setProducts(data);
          if (search || category) {
            setTimeout(() => {
              const section = document.getElementById('products-section');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }
        }
      } catch {
        if (isActive) {
          setProducts([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isActive = false;
    };
  }, [search, category]);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Welcome to ShopAll</h1>
          <p>Your one-stop shop for everything you need</p>
          <div className="hero-actions">
            <a href="#products" className="btn-accent">
              Shop Now
            </a>
            <a href="#about" className="btn-secondary btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose ShopAll?</h2>
          <div className="features-grid">
            <div className="card feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered quickly and safely to your doorstep</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Shop with confidence using our PayPal Sandbox secure checkout</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>We offer competitive prices across all product categories</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="category-card"
                role="button"
                tabIndex={0}
                onClick={() => navigate('/?category=' + cat.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') navigate('/?category=' + cat.name);
                }}
                style={{ backgroundImage: 'url(' + cat.image + ')' }}
              >
                <div className="category-card__overlay">
                  <span className="category-card__icon">{cat.icon}</span>
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__count">
                    {allProducts.filter((p) => p.category === cat.name).length} Products
                  </p>
                  <span className="category-card__cta">Shop Now →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container about-content">
          <div className="about-text">
            <h2>About ShopAll</h2>
            <p>
              ShopAll is a modern e-commerce platform offering electronics, clothing, books and more,
              with a commitment to quality, trusted brands, and customer satisfaction on every order.
            </p>
          </div>
          <div className="stats-grid">
            <div className="card stat-card">
              <div className="stat-number">500+</div>
              <div>Products</div>
            </div>
            <div className="card stat-card">
              <div className="stat-number">10K+</div>
              <div>Customers</div>
            </div>
            <div className="card stat-card">
              <div className="stat-number">50+</div>
              <div>Categories</div>
            </div>
            <div className="card stat-card">
              <div className="stat-number">24/7</div>
              <div>Support</div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div id="products-section" className="container">
          <div className="section-header">
            <h2>
              {search
                ? `Search results for: "${search}"`
                : category
                  ? `Category: "${category}"`
                  : "Our Products"}
            </h2>
          </div>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="loading">No products found.</div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
