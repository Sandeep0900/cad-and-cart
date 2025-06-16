import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext.jsx';


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();



  useEffect(() => {
    getProductById(id).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
     <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <div className="bg-white shadow rounded overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="text-2xl font-semibold text-green-600 mb-2">
            ${product.price}
          </div>

          <div className="mb-4">
            <span className="text-yellow-500 font-semibold">
              ⭐ {product.rating}
            </span>
            <span className="ml-2 text-gray-500">| Stock: {product.stock}</span>
          </div>

          <button onClick={()=> addToCart(product)} className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
