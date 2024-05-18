import React, { useState } from 'react';
import logo from './logo.svg';
import BoardIdForm from './components/BoardIdForm/BoardIdForm';
import Board from './components/Board/Board';
import './App.css';

function App(): JSX.Element {
  const [boardData, setBoardData] = useState({
    _id: "",
    name: "",
    ToDo: [],
    InProgress: [],
    Done: []
  });

  const handleSubmit = (values: { boardId: string }) => {
    console.log('Отправлен ID доски:', values.boardId);
    fetch(`/api/boards/${values.boardId}`)
      .then(res => res.json())
      .then(res => {
        setBoardData(res.data.board);
        console.log(res.data.board); 
      })
      .catch(error => console.error('The error occurred:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <BoardIdForm onSubmit={handleSubmit}/>
      {/* <Counter /> */}
        <Board board={boardData}/>
      </main>
    </div>
  );
}

export default App;