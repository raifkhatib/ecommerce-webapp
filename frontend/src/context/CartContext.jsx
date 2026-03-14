import { createContext, useContext, useMemo, useState } from "react";
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    const productId = product?._id ?? product?.id ?? product?.product;
    if (!productId) return;
    const normalizedQty = Math.max(1, parseInt(qty) || 1);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product === productId);
      if (existing) {
        return prev.map((item) =>
          item.product === productId
            ? {
                ...item,
                qty: Math.min(
                  existing.qty + normalizedQty,
                  product.stock ?? existing.qty + normalizedQty
                )
              }
            : item
        );
      }

      return [
        ...prev,
        {
          product: productId,
          name: product.name,
          imageUrl: product.imageUrl,
          price: Number(product.price) || 0,
          qty: Math.min(normalizedQty, product.stock ?? normalizedQty)
        }
      ];
    });
    toast.success('Added to cart!');
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product !== productId));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty * item.price, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, clearCart, cartTotal }),
    [cartItems, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
