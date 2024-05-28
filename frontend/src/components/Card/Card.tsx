import React,{ useState } from 'react';
import { useAppDispatch} from '../../redux/hooks';
import { editCard, deleteCard } from "../../redux/cardsListSlice/operations";
import { Task } from '../../redux/types/types';
import CustomModal from '../CustomModal/CustomModal';
import EditModal from '../EditModal/EditModal';
import { StyledDiv, StyledH3, StyledP, StyledSvgDiv } from './Card.styled';
import sprite from '../../assets/sprite.svg'


interface TaskProps {
  card: Task;
  setActiveCard: any;
}

const Card: React.FC<TaskProps> = ({ card, setActiveCard}) => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const onDelete = async () => {
    dispatch(deleteCard({ cardId: card._id }));
  };

  const handleEditSubmit = async (title: string, description: string) => {
    dispatch(editCard({ cardId: card._id, title, description }));
      setIsEditModalVisible(false);
  };

  return (
    <StyledDiv draggable onDragStart={() => setActiveCard(card._id)} onDragEnd={() => setActiveCard(null)}>
      <StyledH3>{card.title}</StyledH3>
      <StyledP>{card.description}</StyledP>
      <StyledSvgDiv>
      <button onClick={() => setIsEditModalVisible(true)}>
      <svg width="20" height="20">
        <use href={`${sprite}#icon-edit`} ></use>
      </svg>
      </button>
      <button onClick={() => setIsModalVisible(true)}>
      <svg width="20" height="20">
        <use href={`${sprite}#icon-bin`} ></use>
      </svg>
      </button>
      </StyledSvgDiv>
      <CustomModal
        isOpen={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        onConfirm={() => {setIsModalVisible(false); onDelete();}}
        contentLabel="Confirm Delete"
        message="Are you sure that you want to delete this card?"
      />
       <EditModal
        isOpen={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        contentLabel="Edit Card"
        initialTitle={card.title}
        initialDescription={card.description}
      />
    </StyledDiv>
  );
};

export default Card;
