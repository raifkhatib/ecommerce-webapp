import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";
import axiosInstance from "../api/axiosInstance";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <h1>Checkout</h1>
        <p>
          Your cart is empty. <a href="/">Go back to home.</a>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Checkout</h1>
      <div className="order-summary">
        {cartItems.map((item) => (
          <div key={item.product} className="order-summary__item">
            <span>{item.name}</span>
            <span>
              {item.qty} x ${Number(item.price).toFixed(2)} = $
              {(Number(item.price) * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="order-summary__total">
          <strong>Total:</strong> ${cartTotal.toFixed(2)}
        </div>
      </div>

      <PayPalButtons
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: cartTotal.toFixed(2),
                  currency_code: "USD",
                },
              },
            ],
          })
        }
        onApprove={async (data) => {
          try {
            setProcessing(true);
            const { data: order } = await axiosInstance.post("/orders", {
              orderItems: cartItems,
              totalPrice: cartTotal,
            });
            await axiosInstance.put(`/orders/${order._id}/pay`, {
              paypalOrderId: data.orderID,
            });
            clearCart();
            navigate("/orders");
          } catch (err) {
            toast.error('Payment could not be completed.');
            setError("Payment could not be completed. Please try again.");
            setProcessing(false);
          }
        }}
        onCancel={() => {
          toast.error('Payment cancelled.');
          setError("Payment cancelled. You can try again.");
        }}
        onError={() => {
          toast.error('Payment failed.');
          setError(
            "Payment failed. Please try again or use a different payment method."
          );
        }}
        disabled={processing || cartItems.length === 0}
      />
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
    </div>
  );
}
