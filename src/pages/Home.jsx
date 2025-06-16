import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllProducts,
  searchProducts,
  getAllCategories,
  getProductsByCategory,
  getPaginatedProducts,
} from '../services/api';
import { useCart } from '../context/CartContext.jsx';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 8;
  const skip = (page - 1) * limit;

  useEffect(() => {
    getPaginatedProducts(limit, skip).then(res => {
      setProducts(res.data.products);
      setTotalProducts(res.data.total);
    });

    getAllCategories().then(res => {
      setCategories(res.data);
    });
  }, [page]);

  const totalPages = Math.ceil(totalProducts / limit);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      searchProducts(searchQuery).then(res => {
        setProducts(res.data.products);
        setTotalProducts(res.data.total || res.data.products.length);
      });
    } else {
      getPaginatedProducts(limit, skip).then(res => {
        setProducts(res.data.products);
        setTotalProducts(res.data.total);
      });
    }
    setPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setPage(1);

    if (category === '') {
      getPaginatedProducts(limit, 0).then(res => {
        setProducts(res.data.products);
        setTotalProducts(res.data.total);
      });
    } else {
      getProductsByCategory(category).then(res => {
        setProducts(res.data.products);
        setTotalProducts(res.data.products.length);
      });
    }
  };

  return (
    <div className="p-4">
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>

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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map(product => (
          <div key={product.id} className="bg-white shadow rounded p-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-40 w-full object-cover rounded"
            />
            <Link to={`/product/${product.id}`}>
              <h2 className="text-lg font-semibold mt-2 hover:underline text-blue-600">
                {product.title}
              </h2>
            </Link>
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

      {/* Pagination Controls */}
      {selectedCategory === '' && searchQuery === '' && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅ Previous
          </button>

          <span className="px-4 py-2 text-blue-600 font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
