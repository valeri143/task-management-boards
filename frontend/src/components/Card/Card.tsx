import React,{ useState } from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from '../CustomModal/CustomModal';
import EditModal from '../EditModal/EditModal';
import { StyledDiv, StyledH3, StyledP, StyledSvgDiv } from './Card.styled';
import sprite from '../../assets/sprite.svg'

export interface Task {
  _id: string;
  title: string;
  description: string;
}

interface TaskProps {
  card: Task;
  handleDelete: (cardId: string) => void;
}

const Card: React.FC<TaskProps> = ({ card, handleDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const onDelete = async () => {
    try {
      await axios.delete(`/api/cards/${card._id}`);
      handleDelete(card._id);
      toast.success('The card was successfully deleted');
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Error deleting card');
    }
  };

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    onDelete();
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const handleEditSubmit = async (title: string, description: string) => {
    try {
      await axios.put(`/api/cards/${card._id}`, { title, description });
      card.title = title;
      card.description = description;
      setIsEditModalVisible(false);
      toast.success('The card was successfully edited');
    } catch (error) {
      console.error('Error editing card:', error);
      toast.error('Error editing card');
    }
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  return (
    <StyledDiv>
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
      <ToastContainer/>
      <CustomModal
        isOpen={isModalVisible}
        onRequestClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        contentLabel="Confirm Delete"
        message="Are you sure that you want to delete this card?"
      />
       <EditModal
        isOpen={isEditModalVisible}
        onRequestClose={handleEditCancel}
        onSubmit={handleEditSubmit}
        contentLabel="Edit Card"
        initialTitle={card.title}
        initialDescription={card.description}
      />
     
    </StyledDiv>
  );
};

export default Card;
