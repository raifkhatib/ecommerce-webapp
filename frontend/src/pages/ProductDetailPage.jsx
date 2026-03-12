import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

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

  if (loading) {
    return (
      <div className="page">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page">
        <p>Product not found.</p>
      </div>
    );
  }

  const stock = Number(product.stock) || 0;

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
    <div className="page product-detail">
      <div className="product-detail__image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="product-detail__placeholder">No Image</div>
        )}
      </div>
      <div className="product-detail__info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${Number(product.price).toFixed(2)}</p>
        <p>Stock: {stock}</p>
        <p>Category: {product.category}</p>
        <label>
          Quantity
          <input
            type="number"
            min="1"
            max={stock || undefined}
            value={qty}
            onChange={handleQtyChange}
          />
        </label>
        <button type="button" onClick={handleAddToCart} disabled={stock === 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}