import React from "react";
import Column from "../Column/Column";
import { StyledDiv } from "./Board.styled";
interface BoardProps {
    board: {
      _id: string;
      name: string;
      ToDo: string[];
      InProgress: string[];
      Done: string[];
    };
  }
  
  const Board: React.FC<BoardProps> = ({ board }) => {  
    const toDoTasks: string[] = board.ToDo; 
    const inProgressTasks: string[] = board.InProgress; 
    const doneTasks: string[] = board.Done; 
  
    return (
        <StyledDiv>
          <Column title="To Do" cards={toDoTasks} />
          <Column title="In Progress" cards={inProgressTasks} />
          <Column title="Done" cards={doneTasks} />
        </StyledDiv>
    );
  };
  
  export default Board;