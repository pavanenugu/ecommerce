import React, { createContext, useState, useContext, useEffect } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { useNavigate, Link } from "react-router-dom";

const NavBar = ({ cartItems }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    data: null,
  });

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setAuth({ isAuthenticated: true, data: data });
          } else {
            // Handle error, token might be invalid or expired
            localStorage.removeItem("token");
            setAuth({ isAuthenticated: false, data: null });
          }
        } catch (error) {
          console.error("Error getting data:", error);
        }
      }
    };

    getData();
  }, [localStorage.getItem("token")]);

  const handleSignOut = () => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigate = useNavigate();
  return (
    <div className="px-[160px] py-4 flex justify-between items-center bg-[#007BFF]">
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate("/products");
        }}
      >
        <div className="flex items-center">
         
            <img
              className="w-8 h-8"
              src="https://cdn-icons-png.freepik.com/512/3225/3225194.png"
            />
         
          <div className="flex items-center">
            <span className="text-[32px] text-white flex ml-4">ShopConnect</span>
            
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div
          className="flex items-center cursor-pointer text-[24px]"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <Badge count={cartItems.length}>
            <ShoppingCartOutlined className="text-[24px] text-white" />
          </Badge>
        </div>

        <div className="mx-6 text-white text-[18px] flex items-center">
          {auth.isAuthenticated && (
            <>
              <div
                className="cursor-pointer mr-4"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <UserOutlined /><span className="ml-2">{auth.data.firstName}</span>
              </div>
              {/* <div className="mr-4 ml-1">{auth.data.firstName}</div> */}
              <div onClick={handleSignOut} className="link cursor-pointer ">
                Sign Out
              </div>
            </>
          )}
          {!auth.isAuthenticated && (
            <>
              <div
                onClick={() => {
                  navigate("/login");
                }}
                className="cursor-pointer"
              >
                Login
              </div>
            </>
          )}
        </div>
        <div className="cursor-pointer text-white text-[24px]">
          <MenuOutlined />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
