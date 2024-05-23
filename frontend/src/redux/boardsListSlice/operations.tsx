import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardType, ApiResponse } from '../types/types';

export const fetchBoards = createAsyncThunk<BoardType[], void, { rejectValue: string }>(
  'boards/fetchAll',
  async (_, thunkAPI ) => {
    try {
        const response = await axios.get<ApiResponse<{ boards: BoardType[] }>>('api/boards');
      return response.data.data.boards;
    } catch (e ) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
          }
          return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const getBoardById = createAsyncThunk<BoardType, { boardId: string }, { rejectValue: string }>(
    'boards/getBoardById',
    async ({ boardId }, thunkAPI) => {  
      try {
        const response = await axios.get<ApiResponse<{ board: BoardType }>>(`api/boards/${boardId}`);
        return response.data.data.board;
      } catch (e) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
          }
          return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  );
  

export const addBoard = createAsyncThunk<BoardType, { name: string }, { rejectValue: string }>(
  'boards/addBoard',
  async ({ name }, thunkAPI) => {
    try {
      const response = await axios.post<ApiResponse<{ board: BoardType }>>('/api/boards', { name });
      return response.data.data.board;
    } catch (e) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
          }
          return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const editBoard = createAsyncThunk<BoardType, { boardId: string, newName: string }, { rejectValue: string }>(
    'boards/editBoard',
    async ({ boardId, newName }, thunkAPI) => {
      try {
        const response = await axios.put<ApiResponse<{ board: BoardType }>>(`/api/boards/${boardId}`, { id: boardId, name: newName });
        return response.data.data.board;
      } catch (e) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
          }
          return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  );

export const deleteBoard = createAsyncThunk<string, { boardId: string }, { rejectValue: string }>(
  'boards/deleteBoard',
  async ({boardId}, thunkAPI) => {
    try {
      await axios.delete(`/api/boards/${boardId}`);
      return boardId;
    } catch (e) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
          }
          return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);