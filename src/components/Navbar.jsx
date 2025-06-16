import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function Navbar() {
  const { cartItems } = useCart();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        🛍️ Product Catalog
      </Link>

      <Link to="/cart" className="text-gray-700 hover:text-blue-500">
        🛒 Cart ({cartItems.length})
      </Link>
    </nav>
  );
}

export default Navbar;
