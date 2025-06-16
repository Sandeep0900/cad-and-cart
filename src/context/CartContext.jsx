import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
     toast.success(`${item.title} added to cart!`, 
        { icon: '✅',
          duration: 3000,
        });
    };

  const removeFromCart = (id, item) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
     toast.success(`${item.title} Removed from cart!`,
        { icon: '🔴✅',
          duration: 3000,
        }
     );
    };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
