# 🛒 Advanced Product Catalog

A modern and feature-rich e-commerce product catalog built using **React (Vite)** and **TailwindCSS**, designed to provide a seamless shopping experience with real-time interactivity and responsive design. This project simulates an online storefront using data from the DummyJSON API.

---

## 🚀 Features

### 🧭 General
- Built with **React + Vite**
- Styled using **TailwindCSS**
- Fully **responsive** for mobile, tablet, and desktop
- Supports **dark and light modes** with toggle + toast notification

### 🔍 Product Display & Filters
- Product listing with:
  - 🖼️ Image
  - 🧾 Title & Description
  - 💰 Price
  - 📦 Stock Status
- **Live search with autocomplete**
- **Category filter**
- **Price range filter** with min/max input
- **Rating filter** to view products with 1–5 stars
- **Reset filter** option to clear all filters

### ⭐ Product Detail Page
- Expanded view of selected product
- Price, description, rating, and stock
- Allows users to **rate products**
- Displays **average user rating** and review count
- Add to cart from detail page

### 🛒 Shopping Cart
- Add/remove products to/from cart
- Displays item count and total price
- Accessible from any page
- Cart persists during session

### 🔄 Real-Time Enhancements
- **Polling-based stock check** every 10 seconds
- Blocks add-to-cart if product is out of stock
- **Toast** feedback on theme toggle
- **Loading spinners** during cart actions

### 📦 Pagination
- Pagination support across filtered product lists
- Navigate pages while maintaining active filters

---

## 📦 Tech Stack

- [React (with Vite)](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [DummyJSON API](https://dummyjson.com/)
- [React Hot Toast](https://react-hot-toast.com/) – for toast notifications

---

## 📁 Project Structure

src/
├── assets/
├── components/
│ └── ThemeToggle.jsx
├── context/
│ └── CartContext.jsx
├── pages/
│ ├── Home.jsx
│ └── ProductDetail.jsx
├── services/
│ └── api.js
├── App.jsx
├── main.jsx
└── index.css


---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/product-catalog.git
cd product-catalog
```
2. Install Dependencies
```bash
npm install
```
3. Run the App Locally
```bash
   npm run dev
```
4. Build for Production
```bash
npm run build
```
🌐 Live Demo
Deployed at: https://cad-and-cart-blush.vercel.app/

📷 Screenshots
| Home Page                                                                                | Product Detail                                                                                     | Cart Page                                                                                |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Home](https://github.com/user-attachments/assets/a719a4f8-cbc8-410a-8658-60ffb873e222) | ![Product Detail](https://github.com/user-attachments/assets/0b088b54-ae35-4653-86ab-b45515fcb57f) | ![Cart](https://github.com/user-attachments/assets/f80a17fe-86a0-46e5-9602-18daecd09258) |



✨ Future Enhancements
      Integrate backend to persist user ratings and cart
      Add quantity selector in cart
      Add related products on detail page
      Wishlist / Favorites feature
      Checkout and payment flow

📜 License
      This project is licensed under the MIT License.

🙌 Acknowledgements
      DummyJSON for providing the mock product API
      TailwindCSS for elegant and flexible styling
      React Hot Toast for user-friendly toasts

👤 Author
Sandeep Sharma
LinkedIn: https://www.linkedin.com/in/sandeep--sharma/
