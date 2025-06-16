import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function Navbar() {
  const { cartItems } = useCart();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Left: Brand or Home */}
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">
          🛍️ Cad-Cart
        </Link>

        {/* Hide Home button when already on home */}
        {/* {location.pathname !== '/' &&*/}
          <Link
            to="/"
            className="text-sm px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-100 transition"
          >
            ⬅ Home
          </Link>
        
      </div>

      {/* Right: Cart */}
      <div>
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          🛒 Cart
          <span className="bg-white text-blue-600 text-sm px-2 py-0.5 rounded-full font-bold">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
