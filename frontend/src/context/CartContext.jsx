import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  const fetchCart = async () => {
    const res = await api.get("/cart/");
    setCart(res.data.items);
  };

  const addToCart = async (product, quantity = 1) => {
    const res = await api.post("/cart/add/", {
      product_id: product.id,
      quantity,
    });
    setCart(res.data.cart.items);
  };

  const updateQuantity = async (itemId, quantity) => {
    const res = await api.put(`/cart/update/${itemId}/`, { quantity });
    setCart(res.data.cart.items);
  };

  const removeFromCart = async (itemId) => {
    const res = await api.delete(`/cart/remove/${itemId}/`);
    setCart(res.data.cart.items);
  };

  const clearCart = async () => {
    await api.delete("/cart/clear/");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
