import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </CartProvider>
  </React.StrictMode>
)
