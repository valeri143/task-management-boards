import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addCard, getCardById } from "../../redux/cardsListSlice/operations";
import { selectCards, selectError } from "../../redux/cardsListSlice/selectors";
import { resetCards } from "../../redux/cardsListSlice/cardsListSlice";
import { toast } from "react-toastify";
import { Task } from "../../redux/types/types";
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
    const cardData = useAppSelector(selectCards);
    const error = useAppSelector(selectError);
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
        !error ? toast.success("The card was successfully added") : toast.error("Error adding new card");
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
       {filteredCards.map(card => (
             <Card key={card._id} card={card}/>
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
  