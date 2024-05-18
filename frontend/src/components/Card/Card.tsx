import React from 'react';
import { StyledDiv, StyledH3, StyledP, StyledSvgDiv } from './Card.styled';
import sprite from '../../assets/sprite.svg'

export interface Task {
  _id: string;
  title: string;
  description: string;
}

interface TaskProps {
  card: Task;
}

const Card: React.FC<TaskProps> = ({ card }) => {
  return (
    <StyledDiv>
      <StyledH3>{card.title}</StyledH3>
      <StyledP>{card.description}</StyledP>
      <StyledSvgDiv>
      <button>
      <svg width="20" height="20">
        <use href={`${sprite}#icon-edit`} ></use>
      </svg>
      </button>
      <button>
      <svg width="20" height="20">
        <use href={`${sprite}#icon-bin`} ></use>
      </svg>
      </button>
      </StyledSvgDiv>
    </StyledDiv>
  );
};

export default Card;
