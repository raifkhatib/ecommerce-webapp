import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/orders/myorders");
        if (isActive) {
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isActive) {
          setOrders([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isActive = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="page">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id || order.id}>
                <td>{order._id || order.id}</td>
                <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</td>
                <td>${Number(order.totalPrice || 0).toFixed(2)}</td>
                <td>{order.isPaid ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}