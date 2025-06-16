import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={product.thumbnail} alt={product.title} className="rounded w-full max-h-[400px] object-cover" />

      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl text-green-600 font-semibold mb-2">${product.price}</p>
        <p className="text-sm text-yellow-600 mb-4">Rating: {product.rating} ⭐</p>
        <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
