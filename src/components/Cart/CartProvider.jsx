import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const STORAGE_KEY = "cart";

// Lee el carrito guardado al iniciar la app (si existe y es válido)
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Error al leer el carrito guardado:", err);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadCartFromStorage);

  // Cada vez que cambia el carrito, lo persistimos en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("Error al guardar el carrito:", err);
    }
  }, [cart]);

  const getItemQuantity = (itemId) => {
    const itemInCart = cart.find((item) => item.id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  const addItem = (item, quantity) => {
    const quantityInCart = getItemQuantity(item.id);
    const remainingStock = Math.max(item.stock - quantityInCart, 0);
    const quantityToAdd = Math.min(quantity, remainingStock);

    if (quantityToAdd === 0) {
      return 0;
    }

    setCart((currentCart) => {
      const itemInCart = currentCart.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (itemInCart) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
            : cartItem,
        );
      }

      return [...currentCart, { ...item, quantity: quantityToAdd }];
    });

    return quantityToAdd;
  };

  const removeItem = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        getItemQuantity,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
