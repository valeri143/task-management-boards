import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg';
import CreateBoardForm from './components/CreateBoardForm/CreateBoardForm';
import EditBoardModal from './components/EditBoardModal/EditBoardModal';
import CustomModal from './components/CustomModal/CustomModal';
import BoardIdForm from './components/BoardIdForm/BoardIdForm';
import Board from './components/Board/Board';
import './App.css';
import sprite from './assets/sprite.svg'

export interface BoardType {
  _id: string;
  name: string;
  ToDo: string[];
  InProgress: string[];
  Done: string[];
}


function App(): JSX.Element {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [boardData, setBoardData] = useState<BoardType>({
    _id: "",
    name: "",
    ToDo: [],
    InProgress: [],
    Done: []
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentBoard, setCurrentBoard] = useState<BoardType>({
    _id: "",
    name: "",
    ToDo: [],
    InProgress: [],
    Done: []
  });

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get('/api/boards');
      setBoards(response.data.data.boards);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const handleCreateBoard = async (values: { name: string }, { resetForm }: { resetForm: () => void }) => {
    try {
      const response = await axios.post('/api/boards', { name: values.name });
      setBoards([...boards, response.data.data.board]);
      resetForm();
      toast.success('Board created successfully');
    } catch (error) {
      console.error('Error creating board:', error);
      toast.error('Error creating board');
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    try {
      await axios.delete(`/api/boards/${boardId}`);
      setBoards(boards.filter(board => board._id !== boardId));
      toast.success('Board deleted successfully');
    } catch (error) {
      console.error('Error deleting board:', error);
      toast.error('Error deleting board');
    }
  };

  const handleEditBoard = async (boardId: string, newName: string) => {
    try {
      const response = await axios.put(`/api/boards/${boardId}`, { id: boardId, name: newName });
      setBoards(boards.map(board => board._id === boardId ? response.data.data.board : board));
      toast.success('Board updated successfully');
    } catch (error) {
      console.error('Error updating board:', error);
      toast.error('Error updating board');
    }
  };


  const handleSubmit = async (values: { boardId: string }) => {
    try {
      const response = await axios.get(`/api/boards/${values.boardId}`);
      setBoardData(response.data.data.board);
    } catch (error) {
      console.error('The error occurred:', error);
      toast.error('Invalid board ID');
    }
  };

  return (
    <div className="App">
      <header>
        <CreateBoardForm handleCreateBoard={handleCreateBoard} />
        <ul>
          {boards.map(board => (
            <li key={board._id} className='board'>
              <p><span className='board-info'>Board's name:</span> {board.name}, <span className='board-info'> Board's ID:</span> {board._id}</p>
              <div>
              <button className='board-button' onClick={() => {setCurrentBoard(board); setIsEditModalVisible(true)}}>
                  <svg width="20" height="20">
                      <use href={`${sprite}#icon-edit`} ></use>
                   </svg>
              </button>
               <button onClick={() => {setCurrentBoard(board); setIsModalVisible(true)}}>
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
        <Board board={boardData}/>
        <EditBoardModal 
         isOpen={isEditModalVisible}
         onRequestClose={() => setIsEditModalVisible(false)}
         onSubmit={handleEditBoard} 
         contentLabel='Edit Board'
         board={currentBoard}/>
         <CustomModal
        isOpen={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        onConfirm={() => {setIsModalVisible(false); handleDeleteBoard(currentBoard._id);}}
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