import React from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { TourForm } from "../components/TourForm";
import UserPage from "../pages/UserPage";

export const MainPage = () => {
  const { role } = useSelector((state) => state.auth);
  console.log(role);

  return (
    <div>
      <UserPage />
      {/* 
      {role === "admin" && (
        <div>
          
        </div>
      )}

      {role === "user" && (
        <div>
         
        </div>
      )} */}
      <Link to={"/admin"}>Go to Admin</Link>
      <Link to={"/user"}>Go to User</Link>
    </div>
  );
};
