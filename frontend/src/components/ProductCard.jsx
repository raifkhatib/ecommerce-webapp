import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;
  const productId = product._id ?? product.id;
  const stock = Number(product.stock) || 0;

  let stockLabel = "Out of stock";
  let stockClass = "stock--out";

  if (stock > 10) {
    stockLabel = "In stock";
    stockClass = "stock--high";
  } else if (stock > 0) {
    stockLabel = "Low stock";
    stockClass = "stock--low";
  }

  return (
    <div className="card product-card">
      <div className="product-card__image">
        <span className="badge product-card__badge">{product.category}</span>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=400"
            alt="Placeholder"
          />
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__price">${Number(product.price).toFixed(2)}</p>
        <p className={`product-card__stock ${stockClass}`}>{stockLabel}</p>
        {productId && (
          <Link to={`/products/${productId}`} className="btn-primary product-card__cta">
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
