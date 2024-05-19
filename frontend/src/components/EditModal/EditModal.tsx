import React from 'react';
import Modal from 'react-modal';
import { Formik} from 'formik';
import * as Yup from 'yup';
import { customStyles } from '../CustomModal/CustomModal.styled';
import { StyledButton } from '../CustomModal/CustomModal.styled';
import { StyledForm, StyledField} from './EditModal.styled';
import { StyledErrorMessage } from '../BoardIdForm/BoardIdForm.styled';

interface EditModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (title: string, description: string) => void;
    contentLabel: string;
    initialTitle?: string;
    initialDescription?: string;
  }

  const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    onRequestClose,
    onSubmit,
    contentLabel,
    initialTitle = '',
    initialDescription = '',
  }) => {
    const validationSchema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    });
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel={contentLabel}
        ariaHideApp={false}
      >
        <h2>{initialTitle ? 'Edit Card' : 'Create New Card'}</h2>
        <Formik
          initialValues={{ title: initialTitle, description: initialDescription }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values.title, values.description);
          }}
        >
          {() => (
            <StyledForm>
              <StyledField type="text" name="title" placeholder="Title" />
              <StyledErrorMessage name="title" component="div" />
              <StyledField type="text" name="description" placeholder="Description" />
              <StyledErrorMessage name="description" component="div" />
              <div>
              <StyledButton type="submit">{initialTitle ? 'Save' : 'Create'}</StyledButton>
              <StyledButton type="button" onClick={onRequestClose}>Cancel</StyledButton>
              </div>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    );
  };
  
  export default EditModal;