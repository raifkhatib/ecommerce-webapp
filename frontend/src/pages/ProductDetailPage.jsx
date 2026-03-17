import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import { useCart } from "../context/CartContext.jsx";
import SkeletonDetail from '../components/SkeletonDetail';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let isActive = true;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        if (isActive) {
          setProduct(data);
          setQty(1);
        }
      } catch {
        if (isActive) {
          setProduct(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isActive = false;
    };
  }, [id]);
useEffect(() => {
    if (product) {
      axiosInstance.get(`/products?category=${encodeURIComponent(product.category)}`)
        .then(({ data }) => {
          setRelatedProducts(data.filter(p => p._id !== product._id).slice(0, 4));
        })
        .catch(() => {});
    }
  }, [product]);

  
  if (loading) {
    return (
      <SkeletonDetail />
    );
  }

  if (!product) {
    return (
      <div className="loading">Product not found.</div>
    );
  }

  const stock = Number(product.stock) || 0;
  const stockLabel = stock > 10 ? "In stock" : stock > 0 ? "Low stock" : "Out of stock";
  const stockClass = stock > 10 ? "stock--high" : stock > 0 ? "stock--low" : "stock--out";

  const handleQtyChange = (event) => {
    let value = Number(event.target.value) || 1;
    if (stock > 0) {
      value = Math.min(Math.max(1, value), stock);
    } else {
      value = Math.max(1, value);
    }
    setQty(value);
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  return (
    <section className="product-detail">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt;{" "}
          {product.category ? (
            <Link to={`/?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          ) : (
            "Category"
          )}
          {" "}&gt; {product.name}
        </div>
        <div className="product-detail__layout">
          <div className="product-detail__image">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=400"
                alt="Placeholder"
              />
            )}
          </div>
          <div className="product-detail__info">
            <span className="badge">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="product-card__price">${Number(product.price).toFixed(2)}</div>
            <p>{product.description}</p>
            <p className={`product-card__stock ${stockClass}`}>{stockLabel}</p>
            <div className="divider" />
            <div className="form-field">
              <label htmlFor="qty">Quantity</label>
              <input
                id="qty"
                type="number"
                min="1"
                max={stock || undefined}
                value={qty}
                onChange={handleQtyChange}
              />
            </div>
            <button type="button" className="btn-accent btn-block" onClick={handleAddToCart} disabled={stock === 0}>
              Add to Cart
            </button>
            <Link to="/" className="btn-secondary btn-block">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="container">
            <h2>Related Products</h2>
            <div className="products-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
