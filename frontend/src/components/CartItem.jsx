import { useCart } from "../context/CartContext.jsx";

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();
  if (!item) return null;

  const lineTotal = Number(item.price) * item.qty;

  return (
    <div className="card cart-item-row">
      <div className="cart-item-row__image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=400"
            alt="Placeholder"
          />
        )}
      </div>
      <div className="cart-item-row__info">
        <div className="cart-item-row__name">{item.name}</div>
        <div className="cart-item-row__price">Unit Price: ${Number(item.price).toFixed(2)}</div>
      </div>
      <div className="cart-item-row__qty">Qty: {item.qty}</div>
      <div className="cart-item-row__total">${lineTotal.toFixed(2)}</div>
      <button type="button" className="cart-remove" onClick={() => removeFromCart(item.product)}>
        Remove
      </button>
    </div>
  );
}
