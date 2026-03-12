import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      setSuccess("Product created successfully.");
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="page">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stock
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Create Product</button>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
      </form>
      <button type="button" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}