import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBoards, getBoardById, addBoard, editBoard, deleteBoard } from "./operations";
import { BoardsState, BoardType } from "../types/types";

const initialState: BoardsState = {
    boards: [],
    currentBoard: null,
    isLoading: false,
    error: null,
  };
  
const handlePending = (state : BoardsState) => {
    state.isLoading = true;
  };

const handleRejected = (state: BoardsState, action: PayloadAction<string | undefined>) => {
    state.isLoading = false;
    state.error = action.payload || 'Unknown error';
  };
  
const boardsListSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
          .addCase(fetchBoards.pending, handlePending)
          .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardType[]>) => {
            state.isLoading = false;
            state.boards = action.payload;
            state.error = null;
          })
          .addCase(fetchBoards.rejected, handleRejected)
          .addCase(getBoardById.pending, handlePending)
          .addCase(getBoardById.fulfilled, (state, action: PayloadAction<BoardType>) => {
            state.isLoading = false;
            state.currentBoard = action.payload;
            state.error = null;
          })
          .addCase(getBoardById.rejected, handleRejected)
          .addCase(addBoard.pending, handlePending)
          .addCase(addBoard.fulfilled, (state, action: PayloadAction<BoardType>) => {
            state.isLoading = false;
            state.boards.push(action.payload);
            state.error = null;
          })
          .addCase(addBoard.rejected, handleRejected)
          .addCase(editBoard.pending, handlePending)
          .addCase(editBoard.fulfilled, (state, action: PayloadAction<BoardType>) => {
            state.isLoading = false;
            const index = state.boards.findIndex(board => board._id === action.payload._id);
            if (index !== -1) {
              state.boards[index] = action.payload;
            }
            state.error = null;
          })
          .addCase(editBoard.rejected, handleRejected)
          .addCase(deleteBoard.pending, handlePending)
          .addCase(deleteBoard.fulfilled, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.boards = state.boards.filter(board => board._id !== action.payload);
            state.error = null;
          })
          .addCase(deleteBoard.rejected, handleRejected)
});

export const boardsListReducer = boardsListSlice.reducer;