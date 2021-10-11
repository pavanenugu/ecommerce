import React, { createContext, useState, useContext, useEffect } from "react";
import { Card, Avatar } from 'antd';

function Profile() {
    
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
              console.log(data);
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
      }, []);

  return (
    <div>
    {auth.isAuthenticated && (
    <div className="flex justify-center items-center">
      <Card
        className="max-w-sm rounded overflow-hidden shadow-lg"
        hoverable
      >
        <div className="px-6 py-4">
          <div className="flex flex-col items-center pb-4">
            <Avatar
              size={100}
              src={auth.data.image}
            />
            <div className="font-bold text-xl mt-2">{`${auth.data.firstName} ${auth.data.lastName}`}</div>
            <p className="text-gray-600 text-base">{`@${auth.data.username}`}</p>
          </div>
          <div className="border-t border-gray-200">
            <div className="mt-2">
              <p className="text-gray-700 text-base mb-1">
                <strong>Email:</strong> {auth.data.email}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <strong>Phone:</strong> {auth.data.phone}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <strong>Birth Date:</strong> {auth.data.birthDate}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <strong>Age:</strong> {auth.data.age}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Gender:</strong> {auth.data.gender}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
    )}
    </div>
  );
}

export default Profile;
