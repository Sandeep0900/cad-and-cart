import React from 'react';
import { useCart } from '../context/CartContext.jsx';

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

return (
  <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 min-h-screen">
    <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
     {/* ✅ Total Price Display */}
        <div className="mt-6 text-right border-t pt-4">
          <h2 className="text-xl font-semibold">
            Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
          </h2>
        </div>
        
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
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
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
