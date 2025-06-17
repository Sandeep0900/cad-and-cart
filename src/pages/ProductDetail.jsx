import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext.jsx';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  const [userRatings, setUserRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    getProductById(id).then(res => {
      setProduct(res.data);
      const stored = JSON.parse(localStorage.getItem(`ratings_${res.data.id}`)) || [];
      setUserRatings(stored);
      updateAverage(stored);
    });
  }, [id]);

  const updateAverage = (ratings) => {
    if (ratings.length === 0) {
      setAverageRating(null);
    } else {
      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      setAverageRating(avg.toFixed(1));
    }
  };

  const handleRating = (rating) => {
    const updated = [...userRatings, rating];
    setUserRatings(updated);
    updateAverage(updated);
    localStorage.setItem(`ratings_${product.id}`, JSON.stringify(updated));
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 text-base">{product.description}</p>

          <div className="text-2xl font-semibold text-green-600">${product.price}</div>

          <div className="text-sm text-gray-600 dark:text-gray-300 flex gap-4 items-center">
            <span className="text-yellow-500 font-semibold">⭐ {product.rating}</span>
            <span>| Stock: {product.stock}</span>
            {averageRating && (
              <span>
                | User Avg: <span className="text-yellow-500">{averageRating}</span> ⭐ ({userRatings.length} review{userRatings.length > 1 ? 's' : ''})
              </span>
            )}
          </div>

          {/* User Rating System */}
          <div className="mt-2">
            <p className="text-sm mb-1 text-gray-600 dark:text-gray-300">Rate this product:</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-2xl hover:text-yellow-400 ${
                    userRatings.includes(star) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
