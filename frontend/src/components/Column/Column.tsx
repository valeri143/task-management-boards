import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addCard, getCardById } from "../../redux/cardsListSlice/operations";
import { selectCards } from "../../redux/cardsListSlice/selectors";
import { resetCards } from "../../redux/cardsListSlice/cardsListSlice";
import { Task } from "../../redux/types/types";
import Card from "../Card/Card";
import EditModal from "../EditModal/EditModal";
import { StyledDiv, StyledH2, StyledButton } from "./Column.styled";
import sprite from "../../assets/sprite.svg"
import DropArea from "../DropArea/DropArea";

interface ColumnProps {
    title: 'To Do' | 'In Progress' | 'Done';
    cards: string[];
    boardId: string;
    setActiveCard: any;
    handleDrop: (status: "To Do" | "In Progress" | "Done") => void;
  }
  
  const Column: React.FC<ColumnProps> = ({ title, cards, boardId, setActiveCard, handleDrop }) => {
    const cardData = useAppSelector(selectCards);
    const dispatch = useAppDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(resetCards());
        cards.forEach((cardId) => {
          dispatch(getCardById({cardId}));
        })
    }, [cards, dispatch]);
    

    const handleCreateSubmit = async (title: string, description: string) => {
        const newCardData:Omit<Task, "_id"> = {
            title,
            description,
            column: 'To Do',
            boardId
        };

        dispatch(addCard({ cardData: newCardData }));
        setIsModalVisible(false);
      }
    
      const filteredCards = useMemo(() => {
        const uniqueCards = new Map();
        cardData.forEach((card) => {
          if (card.column === title && !uniqueCards.has(card._id)) {
            uniqueCards.set(card._id, card);
          }
        });
        return Array.from(uniqueCards.values());
      }, [cardData, title]);

    return (
        <div>
        <StyledH2>{title}</StyledH2>
       <StyledDiv>
        <DropArea handleDrop={() => handleDrop(title)}/>
       {filteredCards.map((card, index) => (
            <React.Fragment key={card._id}>
             <Card card={card} setActiveCard={setActiveCard}/>
             <DropArea handleDrop={() => handleDrop(title)}/>
            </React.Fragment>
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
  