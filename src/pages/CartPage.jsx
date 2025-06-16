import React from 'react';
import { useCart } from '../context/CartContext.jsx';

function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between border p-4 rounded shadow">
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>${item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id, item)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
