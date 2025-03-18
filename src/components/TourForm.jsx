import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postTour } from "../store/thunks/tourThunk";

export const TourForm = () => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);

  const [toursValue, setToursValue] = useState({
    title: "",
    image: "",
    description: "",
    cost: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToursValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTourSubmit = (e) => {
    e.preventDefault();
    if (
      !toursValue.title.trim() ||
      !toursValue.cost ||
      !toursValue.description.trim() ||
      !toursValue.image.trim()
    ) {
      return setIsValid(true);
    }

    dispatch(
      postTour({
        ...toursValue,
        id: Date.now(),
        cost: Number(toursValue.cost),
      })
    );

    setIsValid(false);

    setToursValue({
      title: "",
      image: "",
      description: "",
      cost: "",
    });
  };
  const handlerLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <StyledForm onSubmit={handleTourSubmit}>
      <p>Создать прикольчики</p>
      <input
        type="text"
        name="title"
        placeholder="Название тура"
        value={toursValue.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Ссылка на картинку"
        value={toursValue.image}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Описание тура"
        value={toursValue.description}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="cost"
        placeholder="Стоимость"
        value={toursValue.cost}
        min="0"
        onChange={handleInputChange}
      />
      <button type="submit">Создать</button>
      {isValid && <p style={{ color: "red" }}>Заполните все поля</p>}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  position: relative; /* Позволяет абсолютное позиционирование внутри */
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  border-radius: 12px;
  width: 450px;
  margin: 30px auto;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  & > p {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }

  & > input,
  & > textarea {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
    transition: 0.3s ease-in-out;
  }

  & > input:focus,
  & > textarea:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }

  & > textarea {
    min-height: 120px;
    resize: vertical;
  }

  & > .logout-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ff4b4b;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 3px 6px rgba(255, 75, 75, 0.3);
  }

  & > .logout-button:hover {
    background: #d84343;
    transform: scale(1.05);
    box-shadow: 0 5px 10px rgba(255, 75, 75, 0.5);
  }

  & > button {
    padding: 12px;
    border: none;
    color: white;
    background-color: #007bff;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: background 0.3s ease-in-out;
  }

  & > button:hover {
    background-color: #0056b3;
  }

  & > button:active {
    background-color: #004494;
  }

  & > p[style] {
    text-align: center;
    font-size: 14px;
    margin-top: -10px;
  }
`;
