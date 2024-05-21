import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Task } from "../Card/Card";
import Card from "../Card/Card";
import EditModal from "../EditModal/EditModal";
import { StyledDiv, StyledH2, StyledButton } from "./Column.styled";
import sprite from "../../assets/sprite.svg"

interface ColumnProps {
    title: string;
    cards: string[];
    boardId: string;
  }
  
  const Column: React.FC<ColumnProps> = ({ title, cards, boardId }) => {
    const [cardData, setCardData] = useState<Task[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const handleCreateSubmit = async (title: string, description: string) => {
      try {
        const newCardData = {
          title,
          description,
          column: 'To Do',
          boardId
        };

        const response = await axios.post<{ data: { card: Task } }>('/api/cards', newCardData);
        const newCard = response.data.data.card;
        setCardData((prevCards) => [...prevCards, newCard]);
        setIsModalVisible(false);
        toast.success("The card was successfully added");
      } catch (error) {
        console.error("Error adding new card:", error);
        toast.error("Error adding new card");
      }
    }
    
    const handleDelete = (cardId: string) => {
      setCardData((prevCards) => prevCards.filter(card => card._id !== cardId));
    };
  
    return (
            <div>
        <StyledH2>{title}</StyledH2>
       <StyledDiv>
       {cardData.map(card => (
             <Card key={card._id} card={card} handleDelete={handleDelete}/>
        ))}
        {title === "To Do" && boardId && 
         <StyledButton onClick={() => setIsModalVisible(true)}>
          <svg width="50" height="50">
            <use href={`${sprite}#icon-plus`}></use>
          </svg>
        </StyledButton>
          }
       </StyledDiv>
       <EditModal
        isOpen={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        onSubmit={handleCreateSubmit}
        contentLabel="Create New Card"
      />
      </div>
    );
  };

  export default Column;
  