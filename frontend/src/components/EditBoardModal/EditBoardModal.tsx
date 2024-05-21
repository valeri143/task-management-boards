import React from "react";
import Modal from 'react-modal';
import { Formik } from "formik";
import * as Yup from "yup";
import { StyledErrorMessage, StyledField, StyledForm } from "../EditModal/EditModal.styled";
import { StyledButton } from "../CustomModal/CustomModal.styled";
import { customStyles } from "../CustomModal/CustomModal.styled";
import { BoardType } from "../../App";

interface EditModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (boardId: string, newName: string) => void;
    board: BoardType;
    contentLabel: string;
}

const EditBoardModal: React.FC<EditModalProps> = ({
    isOpen,
    onRequestClose,
    onSubmit,
    board,
    contentLabel
}) => {
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel={contentLabel}
        ariaHideApp={false}
      >
        <h2>Edit Board</h2>
        <Formik
        initialValues={{ newName: board.name }}
        validationSchema={Yup.object({
          newName: Yup.string().required('Required'),
        })}
        onSubmit={(values) => {
            onSubmit(board._id, values.newName);
            onRequestClose();
          }}
      >
        <StyledForm>
          <StyledField name="newName" type="text" placeholder="New name" />
          <StyledErrorMessage name="newName" component="div" />
          <StyledButton type="submit">Edit</StyledButton>
        </StyledForm>
      </Formik>
      </Modal>
    );
};

export default EditBoardModal;