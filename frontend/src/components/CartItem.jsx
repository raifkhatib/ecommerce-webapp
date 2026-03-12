import { useCart } from "../context/CartContext.jsx";

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();
  if (!item) return null;

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <div className="cart-item__placeholder">No Image</div>
        )}
      </div>
      <div className="cart-item__details">
        <h4>{item.name}</h4>
        <p>Unit Price: ${Number(item.price).toFixed(2)}</p>
        <p>Quantity: {item.qty}</p>
      </div>
      <button type="button" onClick={() => removeFromCart(item.product)}>
        Remove
      </button>
    </div>
  );
}