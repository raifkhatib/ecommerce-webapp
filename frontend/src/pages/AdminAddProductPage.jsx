import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axiosInstance from "../api/axiosInstance.js";

const initialForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  stock: "",
  category: ""
};

export default function AdminAddProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axiosInstance.post("/products", {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        imageUrl: form.imageUrl,
        stock: Number(form.stock),
        category: form.category
      });
      toast.success('Product created!');
      setSuccess("Product created successfully.");
      setForm(initialForm);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create product');
      setError(err.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <section className="admin-page">
      <div className="container">
        <div className="section-header">
          <div>
            <h1>Add New Product</h1>
            <p className="text-muted">Create a new listing for the ShopAll catalog.</p>
          </div>
        </div>
        <div className="card admin-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-field span-2">
              <label htmlFor="name">Name</label>
              <input name="name" id="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-field span-2">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="price">Price</label>
              <input
                name="price"
                id="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="stock">Stock</label>
              <input
                name="stock"
                id="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field span-2">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                name="imageUrl"
                id="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field span-2">
              <label htmlFor="category">Category</label>
              <input
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field span-2">
              <button type="submit" className="btn-primary btn-block">
                Create Product
              </button>
              {success && <p className="success-text">{success}</p>}
              {error && <p className="error-text">{error}</p>}
            </div>
          </form>
          <button type="button" className="btn-secondary btn-block" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}
