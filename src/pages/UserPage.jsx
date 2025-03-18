import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { toggleTourSelection } from "../store/slices/userSlice"; 

export default function UserPage() {
  const dispatch = useDispatch();
  const { selectedTours } = useSelector((state) => state.user); 

  return (
    <UserContainer>
      <h1>Избранные туры</h1>

      {selectedTours.length === 0 ? (
        <p>Вы еще не добавили туры в избранное</p>
      ) : (
        <TourList>
          {selectedTours.map((tour) => (
            <TourCard key={tour.id}>
              <img src={tour.image} alt={tour.title} />
              <h3>{tour.title}</h3>
              <p>{tour.description}</p>
              <span>{tour.cost} сом</span>
              <button onClick={() => dispatch(toggleTourSelection(tour))}>
                Удалить из избранного
              </button>
            </TourCard>
          ))}
        </TourList>
      )}

      {/* <Link to={"/"}>Вернуться на главную</Link> */}
    </UserContainer>
  );
}

const UserContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
  background-color: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const TourList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  padding: 20px;
`;

const TourCard = styled.div`
  width: 320px;
  background: linear-gradient(135deg, #ffffff, #f0f4f8);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  & > img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }

  & > h3 {
    margin: 12px 0;
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }

  & > p {
    font-size: 15px;
    color: #555;
    line-height: 1.4;
  }

  & > span {
    display: inline-block;
    margin-top: 10px;
    font-weight: bold;
    color: #007bff;
    font-size: 16px;
  }
`;
