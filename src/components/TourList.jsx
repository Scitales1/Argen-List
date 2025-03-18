import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteTourRequest, getAllTour } from "../store/thunks/tourThunk";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from "react-router-dom";
import { toggleTourSelection } from "../store/slices/userSlice"; // Добавили action

export const TourList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tours, loading, error } = useSelector((state) => state.tours);
  const { selectedTours } = useSelector((state) => state.user); // Получаем сохраненные туры

  useEffect(() => {
    dispatch(getAllTour());
  }, [dispatch]);

  const handleNavigate = (tourId) => {
    navigate(`/tourInfo/${tourId}`);
  };

  const handleCheckboxChange = (tour) => {
    dispatch(toggleTourSelection(tour)); // Добавляем или убираем тур из user
  };

  return (
    <StyledTourList>
      <hr />
      {loading && <StyledLoader color="black" />}
      {error && <h1 style={{ color: "red" }}>Error</h1>}
      {tours?.map((tour) => (
        <TourCard key={tour.id}>
          <img src={tour.image} alt={tour.title} />
          <h3>{tour.title}</h3>
          <p>{tour.description}</p>
          <span>{tour.cost} сом </span>
          <button onClick={() => handleNavigate(tour.id)}>Подробнее</button>
          <button onClick={() => dispatch(deleteTourRequest(tour.id))}>
            Удалить
          </button>
          <label>
            <input
              type="checkbox"
              checked={selectedTours.some((t) => t.id === tour.id)}
              onChange={() => handleCheckboxChange(tour)}
            />
            Добавить в избранное
          </label>
        </TourCard>
      ))}
    </StyledTourList>
  );
};

const StyledLoader = styled(PacmanLoader)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledTourList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  & > h3 {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

const TourCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 70%;
  margin: auto;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  & > img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }

  & > button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #0056b3;
    }

    &:active {
      background-color: #004494;
    }
  }

  & > label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
  }

  & > input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #007bff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:checked {
      background-color: #007bff;
      border-color: #007bff;
      position: relative;
    }

    &:checked::after {
      content: "✔";
      color: white;
      font-size: 14px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
