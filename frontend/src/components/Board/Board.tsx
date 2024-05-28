import React, { useState } from "react";
import Column from "../Column/Column";
import { StyledDiv } from "./Board.styled";
import { BoardType } from "../../redux/types/types";
import { useAppDispatch} from "../../redux/hooks";
import { updateCardStatus } from "../../redux/cardsListSlice/operations";
interface BoardProps {
    board: BoardType | null
  }
  
  const Board: React.FC<BoardProps> = ({ board }) => {  
    const [activeCard, setActiveCard] = useState(null);
    const dispatch = useAppDispatch();

    if (!board) return null;
    const toDoTasks: string[] = board.ToDo; 
    const inProgressTasks: string[] = board.InProgress; 
    const doneTasks: string[] = board.Done; 

    

    const handleDrop =  (status: "To Do" | "In Progress" | "Done") => {
      if(activeCard === null || activeCard === undefined) return;
      dispatch(updateCardStatus({ cardId: activeCard, newStatus: status, boardId: board._id }))
    }

    return (
      <>
      {board && board._id ? (
        <StyledDiv>
        <Column title="To Do" cards={toDoTasks} boardId={board._id} setActiveCard={setActiveCard} handleDrop={handleDrop}/>
        <Column title="In Progress" cards={inProgressTasks} boardId={board._id} setActiveCard={setActiveCard} handleDrop={handleDrop}/>
        <Column title="Done" cards={doneTasks} boardId={board._id} setActiveCard={setActiveCard} handleDrop={handleDrop}/>
      </StyledDiv>
      ): null} 
      </>
     
    );
  };
  
  export default Board;