import React from 'react';
import { Formik} from 'formik';
import * as Yup from 'yup';
import { StyledForm, StyledField, StyledButton, StyledErrorMessage } from './BoardIdForm.styled';

interface BoardIdFormProps {
  onSubmit: (values: { boardId: string }) => void;
}

const BoardIdForm: React.FC<BoardIdFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ boardId: '' }}
      validationSchema={Yup.object().shape({
        boardId: Yup.string().required("Board's ID is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {() => (
        <StyledForm>
          <div>
            <StyledField type="text" id="boardId" name="boardId" placeholder="Enter a board ID here..." />
            <StyledErrorMessage name="boardId" component="div" />
          </div>
          <StyledButton type="submit">Load</StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default BoardIdForm;
