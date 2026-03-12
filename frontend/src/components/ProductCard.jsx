import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;
  const productId = product._id ?? product.id;

  return (
    <div className="product-card">
      <div className="product-card__image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="product-card__placeholder">No Image</div>
        )}
      </div>
      <h3>{product.name}</h3>
      <p>${Number(product.price).toFixed(2)}</p>
      {productId && (
        <Link to={`/products/${productId}`}>View Details</Link>
      )}
    </div>
  );
}