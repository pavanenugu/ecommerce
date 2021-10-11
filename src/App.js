import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import "antd/dist/antd.css";
import 'antd/dist/reset.css';
import Product from "./pages/Product/Product";
import { useState } from "react";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/profile";


function App() {
  const [cartItems, setCartItems] = useState([])
  return (
    <div class=" h-screen ">
      <NavBar cartItems={cartItems} />
      <div className="w-[70%] m-auto py-20">
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Home />} />
          <Route path="/products/:id" element={<Product cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
