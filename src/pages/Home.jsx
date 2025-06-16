import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data.products))
      .catch(err => console.error(err));
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
        </div>
      ))}
    </div>
  );
}

export default Home;
