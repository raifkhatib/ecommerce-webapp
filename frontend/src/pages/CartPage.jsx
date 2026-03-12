import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem key={item.product} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <p>Total: ${cartTotal.toFixed(2)}</p>
        <button type="button" onClick={() => navigate("/checkout")}> 
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}