import React, { useEffect, useState } from 'react';
import {
  getAllProducts,
  searchProducts,
  getAllCategories,
  getProductsByCategory,
} from '../services/api'; // Make sure this file exists
import { useCart } from '../context/CartContext.jsx';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    getAllProducts().then(res => setProducts(res.data.products));
    getAllCategories().then(res => {
  console.log("Fetched categories:", res.data); // debug line
  setCategories(res.data);
});
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      searchProducts(searchQuery).then(res => setProducts(res.data.products));
    } else {
      getAllProducts().then(res => setProducts(res.data.products));
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === '') {
      getAllProducts().then(res => setProducts(res.data.products));
    } else {
      getProductsByCategory(category).then(res => setProducts(res.data.products));
    }
  };


  return (


    <div className="p-4">
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        >
          <option value="">All Categories</option>
          {Array.isArray(categories) &&
          categories.map(cat => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
        </select>
      </div>

    
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
  </div>
  );
}

export default Home;
