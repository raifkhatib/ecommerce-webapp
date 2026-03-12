import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import ProductCard from "../components/ProductCard.jsx";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : "";
        const { data } = await axiosInstance.get(`/products${query}`);
        if (isActive) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isActive) {
          setProducts([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isActive = false;
    };
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="page">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}