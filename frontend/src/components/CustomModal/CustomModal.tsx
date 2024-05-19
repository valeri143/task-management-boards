import React from "react";
import Modal from "react-modal";
import { StyledButton, StyledDiv,StyledP,customStyles } from "./CustomModal.styled";

interface CustomModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
    contentLabel: string;
    message: string;
  }

  const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, onConfirm, contentLabel, message }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel={contentLabel}
        ariaHideApp={false}
      >
        <StyledDiv>
          <StyledP>{message}</StyledP>
          <StyledButton onClick={onConfirm}>Yes</StyledButton>
          <StyledButton onClick={onRequestClose}>No</StyledButton>
        </StyledDiv>
      </Modal>
    );
  };
  
  export default CustomModal;