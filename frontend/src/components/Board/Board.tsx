import React from "react";
import Column from "../Column/Column";
import { StyledDiv } from "./Board.styled";
import { BoardType } from "../../redux/types/types";
interface BoardProps {
    board: BoardType | null
  }
  
  const Board: React.FC<BoardProps> = ({ board }) => {  
    if (!board) return null;
    const toDoTasks: string[] = board.ToDo; 
    const inProgressTasks: string[] = board.InProgress; 
    const doneTasks: string[] = board.Done; 
  
    return (
      <>
      {board && board._id ? (
        <StyledDiv>
        <Column title="To Do" cards={toDoTasks} boardId={board._id}/>
        <Column title="In Progress" cards={inProgressTasks} boardId={board._id}/>
        <Column title="Done" cards={doneTasks} boardId={board._id}/>
      </StyledDiv>
      ): null} 
      </>
     
    );
  };
  
  export default Board;