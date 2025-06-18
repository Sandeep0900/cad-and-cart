import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllProducts,
  getProductById,
  searchProducts,
  getAllCategories,
  getProductsByCategory,
  getPaginatedProducts,
} from '../services/api';
import { useCart } from '../context/CartContext.jsx';
import { CheckCircle2, RefreshCcw, Search } from 'lucide-react';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [minRating, setMinRating] = useState('');


  const [loadingProductId, setLoadingProductId] = useState(null);
  const [outOfStockMessage, setOutOfStockMessage] = useState(null);

  const [userRatings, setUserRatings] = useState({});

  const [refreshing, setRefreshing] = useState(false);

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

//   useEffect(() => {
//   const interval = setInterval(async () => {
//     try {
//       const updatedProducts = await Promise.all(
//         products.map(async (p) => {
//           const res = await getProductById(p.id);
//           return res.data;
//         })
//       );
//       setProducts(updatedProducts);
//     } catch (err) {
//       console.error('Polling error:', err);
//     }
//   }, 10000); // Every 10 seconds

//   return () => clearInterval(interval);
// }, [products]);

useEffect(() => {
  const savedRatings = JSON.parse(localStorage.getItem('userRatings'));
  if (savedRatings) {
    setUserRatings(savedRatings);
  }
}, []);

useEffect(() => {
  localStorage.setItem('userRatings', JSON.stringify(userRatings));
}, [userRatings]);




useEffect(() => {
  const interval = setInterval(async () => {
    setRefreshing(true);
    try {
      const updatedProducts = await Promise.all(
        products.map(async (p) => {
          const res = await getProductById(p.id);
          return res.data;
        })
      );
      setProducts(updatedProducts);
    } catch (err) {
      console.error('Polling error:', err);
    } finally {
      setRefreshing(false);
    }
  }, 10000);

  return () => clearInterval(interval);
}, [products]);


  useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);



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

  const handlePriceFilter = () => {
  const min = Number(minPrice) || 0;
  const max = Number(maxPrice) || Infinity;

  const filtered = products.filter(product => {
    return product.price >= min && product.price <= max;
  });

  setProducts(filtered);
};


const handleResetFilters = () => {
  setSearchQuery('');
  setSelectedCategory('');
  setMinPrice('');
  setMaxPrice('');
  setMinRating('');
  setPage(1);

  getPaginatedProducts(limit, 0).then(res => {
    setProducts(res.data.products);
    setTotalProducts(res.data.total);
  });
};

const handleRatingFilter = (rating) => {
  const r = parseFloat(rating);
  if (!r) {
    handleSearch(); // Show all or current filtered products
    return;
  }

  const filtered = products.filter(product => product.rating >= r);
  setProducts(filtered);
};

const handleUserRating = (productId, rating) => {
  setUserRatings(prev => {
    const updated = { ...prev };
    if (!updated[productId]) {
      updated[productId] = [];
    }
    updated[productId].push(rating);
    return updated;
  });
};



const handleAddToCart = async (product) => {
  // Show spinner
  setLoadingProductId(product.id);
  setOutOfStockMessage(null);

  // Simulate availability check
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay (e.g. API check)

  if (product.stock > 0) {
    addToCart(product);
  } else {
    setOutOfStockMessage(`❌ "${product.title}" is out of stock.`);
  }

  // Remove spinner
  setLoadingProductId(null);
};





  const handleInputChange = async (e) => {
  const value = e.target.value;
  setSearchQuery(value);

  if (value.trim() === '') {
    setSuggestions([]);
    setShowSuggestions(false);
    return;
  }

  try {
    const res = await searchProducts(value);
    const names = res.data.products.map(p => p.title);
    setSuggestions(names.slice(0, 5)); // Top 5 suggestions
    setShowSuggestions(true);
  } catch (err) {
    console.error('Suggestion fetch error', err);
    setSuggestions([]);
    setShowSuggestions(false);
  }
};



  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen p-6 space-y-6">

  {/* Filters Panel */}
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 space-y-4">
    
    {/* Search + Category */}
    <div className="flex flex-col md:flex-row md:items-end gap-4">
      {/* Search with Suggestions */}
      <div ref={searchRef} className="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded mt-1 w-full max-h-48 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchQuery(suggestion);
                  handleSearch();
                  setShowSuggestions(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
      >
        <div className="flex items-center justify-center gap-2">
          <Search size={16} /> Search
        </div>
        
      </button>

      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full md:w-1/3 px-3 py-2 border rounded bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

    {/* Price Filter Row */}
    <div className="flex flex-col sm:flex-row md:items-end gap-4">
      {/* Min/Max Inputs */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full sm:w-36 px-3 py-2 border rounded bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full sm:w-36 px-3 py-2 border rounded bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={handlePriceFilter}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto cursor-pointer"
      >
        <div className='flex items-center justify-center gap-2'>
          <CheckCircle2  size={16}/>Apply
        </div>
      </button>

      {/* Reset Button */}
      <button
        onClick={handleResetFilters}
        className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-100 dark:hover:bg-gray-800 w-full sm:w-auto"
      >
        <div className='flex items-center justify-center gap-2 cursor-pointer'>
          <RefreshCcw size={16}/> Reset
        </div>
      </button>

      <select
  value={minRating}
  onChange={(e) => {
    setMinRating(e.target.value);
    handleRatingFilter(e.target.value);
  }}
  className="w-full md:w-1/3 px-3 py-2 border rounded bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">All Ratings</option>
  <option value="1">⭐ 1 & above</option>
  <option value="2">⭐ 2 & above</option>
  <option value="3">⭐ 3 & above</option>
  <option value="4">⭐ 4 & above</option>
  <option value="5">⭐ 5 only</option>
</select>


    </div>
  </div>

  {/* Product Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map(product => (
      <div key={product.id} className="bg-white dark:bg-gray-800 shadow rounded p-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-40 w-full object-cover rounded"
          />
          <h2 className="text-lg font-semibold mt-2 hover:underline text-black dark:text-white">
            {product.title}
          </h2>
        </Link>

        <p className="text-yellow-500 text-sm">
         {'★'.repeat(Math.floor(product.rating))}{' '}
        <span className="text-gray-500 dark:text-gray-400 text-xs">({product.rating})</span>
        </p>




        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
          {product.description}
        </p>

        <p className="text-gray-700 dark:text-gray-200 font-semibold mt-1">${product.price}</p>

        {/* Updated Average Rating */}
{userRatings[product.id] && userRatings[product.id].length > 0 && (
  <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
    User Avg: {(
      userRatings[product.id].reduce((a, b) => a + b, 0) /
      userRatings[product.id].length
    ).toFixed(1)}{' '}
    ({userRatings[product.id].length} review{userRatings[product.id].length > 1 ? 's' : ''})
  </p>
)}


        <p className={`text-sm font-medium mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
          {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
        </p>

        <div className="mt-3">
  <p className="text-sm mb-1 text-gray-600 dark:text-gray-300">Rate this product:</p>
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => handleUserRating(product.id, star)}
        className={`text-xl ${
          userRatings[product.id]?.includes(star)
            ? 'text-yellow-400'
            : 'text-gray-400'
        } hover:text-yellow-500`}
      >
        ★
      </button>
    ))}
  </div>
</div>


        <button
  onClick={() => handleAddToCart(product)}
  disabled={loadingProductId === product.id}
  className={`px-3 py-1 mt-3 rounded cursor-pointer transition ${
    product.stock === 0
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-blue-500 text-white hover:bg-blue-600'
  }`}
>
  {loadingProductId === product.id ? (
    <span className="flex items-center gap-2">
      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      Adding...
    </span>
  ) : (
    'Add to Cart'
  )}
</button>

      </div>
    ))}
  </div>

  {refreshing && (
  <p className="text-center text-sm text-gray-500">🔄 Checking stock availability...</p>
)}


  {/* Pagination */}
  {selectedCategory === '' && searchQuery === '' && (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 disabled:opacity-50"
      >
        ⬅ Previous
      </button>

      <span className="px-4 py-2 text-blue-600 font-semibold dark:text-blue-400">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Next ➡
      </button>
    </div>
  )}
</div>
  );
}

export default Home;
