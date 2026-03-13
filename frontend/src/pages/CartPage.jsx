import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container cart-empty">
        <div className="cart-empty__icon">🛒</div>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{itemCount} items</p>
        </div>
        <div className="cart-layout">
          <div className="cart-left">
            {cartItems.map((item) => (
              <CartItem key={item.product} item={item} />
            ))}
          </div>
          <div className="cart-right">
            <div className="card cart-summary-card">
              <h3>Order Summary</h3>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="divider" />
              <div className="cart-summary-row">
                <span>Total</span>
                <span className="cart-total">${cartTotal.toFixed(2)}</span>
              </div>
              <button type="button" className="btn-accent btn-block" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
