import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchBoards, getBoardById, addBoard, editBoard, deleteBoard } from './redux/boardsListSlice/operations';
import { selectBoards, selectIsLoading, selectError, selectCurrentBoard } from './redux/boardsListSlice/selectors';
import { ToastContainer, toast } from 'react-toastify';
import { BoardType } from './redux/types/types';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg';
import CreateBoardForm from './components/CreateBoardForm/CreateBoardForm';
import EditBoardModal from './components/EditBoardModal/EditBoardModal';
import CustomModal from './components/CustomModal/CustomModal';
import BoardIdForm from './components/BoardIdForm/BoardIdForm';
import Board from './components/Board/Board';
import './App.css';
import sprite from './assets/sprite.svg'



function App(): JSX.Element {
  const boards = useAppSelector(selectBoards);
  const currentBoard = useAppSelector(selectCurrentBoard);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedOrDeletedBoard, setEditedOrDeletedBoard] = useState<BoardType>({
    _id: "",
    name: "",
    ToDo: [],
    InProgress: [],
    Done: []
  });

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCreateBoard = async (values: { name: string }, { resetForm }: { resetForm: () => void }) => {
      dispatch(addBoard({ name: values.name }));
      resetForm();
      toast.success('Board created successfully');
     if (error) {
      toast.error('Error creating board');
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
      dispatch(deleteBoard({boardId}));
      toast.success('Board deleted successfully');
      if(error){
        toast.error('Error deleting board')
      }
  };

  const handleEditBoard = async (boardId: string, newName: string) => {
      dispatch(editBoard({ boardId, newName }));
      toast.success('Board updated successfully');
      if(error){
        toast.error('Error updating board');
      }
  };

  const handleSubmit = async (values: { boardId: string }) => {
     dispatch(getBoardById({ boardId: values.boardId.trim() }));
      if(error){
        toast.error('Invalid board ID');
      }  
  };

  return (
    <div className="App">
      <header>
        <CreateBoardForm handleCreateBoard={handleCreateBoard} />
        <ul className='board-list'>
          {boards.map(board => (
            <li key={board._id} className='board'>
              <p><span className='board-info'>Board's name:</span> {board.name}, <span className='board-info'> Board's ID:</span> {board._id}</p>
              <div>
              <button className='board-button' onClick={() => {setEditedOrDeletedBoard(board); setIsEditModalVisible(true)}}>
                  <svg width="20" height="20">
                      <use href={`${sprite}#icon-edit`} ></use>
                   </svg>
              </button>
               <button onClick={() => {setEditedOrDeletedBoard(board); setIsModalVisible(true)}}>
                   <svg width="20" height="20">
                      <use href={`${sprite}#icon-bin`} ></use>
                  </svg>
               </button>
              </div>
            </li>
          ))}
        </ul> 
      </header>
      <main>
      <div className='container'>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Task Management Boards</h1>
      </div>
        <BoardIdForm onSubmit={handleSubmit}/>
        <Board board={currentBoard}/>
        <EditBoardModal 
         isOpen={isEditModalVisible}
         onRequestClose={() => setIsEditModalVisible(false)}
         onSubmit={handleEditBoard} 
         contentLabel='Edit Board'
         board={editedOrDeletedBoard}/>
         <CustomModal
        isOpen={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        onConfirm={() => {setIsModalVisible(false); handleDeleteBoard(editedOrDeletedBoard._id);}}
        contentLabel="Confirm Delete"
        message="Are you sure that you want to delete this card?"
      />
        <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </main>
    </div>
  );
}

export default App;