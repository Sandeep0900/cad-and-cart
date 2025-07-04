import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CartPage from './pages/CartPage.jsx';
import Navbar from './components/Navbar.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

function App() {
  return (
   <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
   </div>
  );
}

// {/* <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/cart" element={<CartPage />} />
//   <Route path="/product/:id" element={<ProductDetail />} />  {/* ✅ NEW */}
// </Routes> */}

export default App;
