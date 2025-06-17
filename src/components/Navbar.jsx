import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';


function Navbar() {
  const { cartItems } = useCart();
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 text-gray-900 dark:text-white">
      {/* Left: Brand or Home */}
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-xl font-bold text-white hover:text-blue-800">
          🛍️ Cad-Cart
        </Link>

        {location.pathname !== '/' && (
  <Link
    to="/"
    className="text-sm px-4 py-2 rounded border border-blue-600 text-white-600 hover:bg-blue-100 hover:text-black transition"
  >
    ⬅ Without Refresh Move to Home
  </Link>
)}


        {/* {location.pathname !== '/' &&*/}
          <a
            href="/"
            className="text-sm px-4 py-2 rounded border border-blue-600 text-white-600 hover:bg-blue-100 hover:text-black transition"
          >
            ⬅Refresh and Move to Home
          </a>
        
      </div>

      <div className="flex items-center gap-4">
        <Link
            to="/cart"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
            🛒 Cart
            <span className="bg-white text-blue-600 text-sm px-2 py-0.5 rounded-full font-bold">
                {cartItems.length}
            </span>
        </Link>

        {/* ✅ Theme Toggle Button */}
        <ThemeToggle />
     </div>
    </nav>
  );
}

export default Navbar;
