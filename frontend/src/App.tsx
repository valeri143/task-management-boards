import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchBoards, getBoardById, addBoard, editBoard, deleteBoard } from './redux/boardsListSlice/operations';
import { selectBoards, selectIsLoading, selectCurrentBoard } from './redux/boardsListSlice/selectors';
import { removeCardsByBoardId } from './redux/cardsListSlice/cardsListSlice';
import { ToastContainer } from 'react-toastify';
import { BoardType } from './redux/types/types';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loader-spinner';
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
      await dispatch(addBoard({ name: values.name }));
      resetForm();
  };

  const handleDeleteBoard = async (boardId: string) => {
      dispatch(deleteBoard({ boardId }));
      dispatch(removeCardsByBoardId(boardId)); 
  };

  const handleEditBoard = async (boardId: string, newName: string) => {
      await dispatch(editBoard({ boardId, newName }));
  };

  const handleSubmit = async (values: { boardId: string }) => {
      await dispatch(getBoardById({ boardId: values.boardId.trim() }));
  };

  return (
    <div className="App">
      {isLoading && (
         <div className="loader-wrapper">
         <div className="blur-background"></div>
         <TailSpin
           height={80}
           width={80}
           color="#000000"
           ariaLabel="tail-spin-loading"
           radius={1}
           wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
           wrapperClass=""
           visible={true}
         />
       </div>
      )}
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