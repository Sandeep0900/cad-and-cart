import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api'; // Make sure this file exists
import { useCart } from '../context/CartContext.jsx';

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('API error:', err));
  }, []);

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map(product => (
        <div key={product.id} className="bg-white shadow rounded p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-40 w-full object-cover rounded"
          />
          <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
          <p className="text-gray-500">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-3 py-1 mt-3 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
