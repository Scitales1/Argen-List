import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    const authData = localStorage.getItem("auth");
    if (authData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); 
    }
  }, []);

  const handlerLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <StyledHeader>
      <h1>Argen List</h1>
      {isAuthenticated && <button onClick={handlerLogout}>ВЫЙТИ</button>}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  height: 70px;
  padding: 15px 20px;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #333, #555);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  & > h1 {
    color: #fff;
    font-size: 24px;
    margin: 0;
    font-weight: bold;
    letter-spacing: 1px;
  }

  & > button {
    background: #ff4b4b;
    color: white;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 3px 6px rgba(255, 75, 75, 0.3);
  }

  & > button:hover {
    background: #d84343;
    transform: scale(1.05);
    box-shadow: 0 5px 10px rgba(255, 75, 75, 0.5);
  }

  & > button:active {
    transform: scale(0.95);
  }
`;
