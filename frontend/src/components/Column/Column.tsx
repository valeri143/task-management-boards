import React, { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "../Card/Card";
import Card from "../Card/Card";
import { StyledDiv, StyledH2, StyledButton } from "./Column.styled";
import sprite from "../../assets/sprite.svg"


interface ColumnProps {
    title: string;
    cards: string[];
  }
  
  const Column: React.FC<ColumnProps> = ({ title, cards }) => {
    const [cardData, setCardData] = useState<Task[]>([]);

    useEffect(() => {
        const fetchCardData = async () => {
          const data = await Promise.all(
            cards.map((cardId) =>
              axios.get<{ data: { card: Task } }>(`/api/cards/${cardId}`).then((res) => res.data.data.card)
            )
          );
          setCardData(data);
        };

        fetchCardData();
    }, [cards]);

    const handleClick = async () => {
      try {
        const newCardData = {
          title: 'New Task',
          description: 'Description for new task',
          column: 'To Do'
        };
        const response = await axios.post<{ data: { card: Task } }>('/api/cards', newCardData);
        const newCard = response.data.data.card;
        setCardData((prevCards) => [...prevCards, newCard]);
        console.log("Added new card to column: " + title);
      } catch (error) {
        console.error("Error adding new card:", error);
      }
    }
    return (
      <div>
        <StyledH2>{title}</StyledH2>
       <StyledDiv>
       {cardData.map(card => (
          <Card key={card._id} card={card} />
        ))}
        {title === "To Do" && 
          <StyledButton onClick={handleClick}>
            <svg width="50" height="50">
              <use href={`${sprite}#icon-plus`}></use>
            </svg>
          </StyledButton>}
       </StyledDiv>
      </div>
    );
  };

  export default Column;
  