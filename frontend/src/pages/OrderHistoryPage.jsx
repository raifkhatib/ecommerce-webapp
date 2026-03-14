import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <section className="orders-page">
        <div className="container">
          <div className="skeleton skeleton-row" />
          <div className="skeleton skeleton-row" />
          <div className="skeleton skeleton-row" />
          <div className="skeleton skeleton-row" />
        </div>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <div className="container">
        <div className="section-header">
          <div>
            <h1>My Orders</h1>
            <p className="text-muted">Review your recent purchases and payment status.</p>
          </div>
        </div>
        {orders.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <h2>No Orders Yet</h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>When you make your first purchase it will appear here.</p>
            <Link to="/" className="btn-accent">Shop Now</Link>
          </div>
        ) : (
          <table className="data-table">
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
                  <td>
                    <span
                      className={`status-badge ${order.isPaid ? "status-paid" : "status-pending"}`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
