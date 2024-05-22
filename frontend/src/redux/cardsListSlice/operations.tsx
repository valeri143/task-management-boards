import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, Task } from '../types/types';

export const getCardById = createAsyncThunk<Task, { cardId: string }, { rejectValue: string }>(
  'cards/getCardById',
  async ({ cardId }, thunkAPI ) => {
    try {
        const response = await axios.get<ApiResponse<{ card: Task }>>(`api/cards/${cardId}`);
        return response.data.data.card;
    } catch (e ) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
          }
          return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);
  

export const addCard = createAsyncThunk<Task, { cardData: Omit<Task, '_id'> }, { rejectValue: string }>(
  'cards/addCard',
  async ({ cardData }, thunkAPI) => {
    try {
      const response = await axios.post<ApiResponse<{ card: Task }>>('/api/cards', { ...cardData });
      return response.data.data.card;
    } catch (e) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
          }
          return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const editCard = createAsyncThunk<Task, { cardId: string, title: string, description: string }, { rejectValue: string }>(
    'cards/editCard',
    async ({ cardId, title, description }, thunkAPI) => {
      try {
        const response = await axios.put<ApiResponse<{ card: Task }>>(`/api/cards/${cardId}`, { id: cardId, title, description });
        return response.data.data.card;
      } catch (e) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
          }
          return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  );

export const deleteCard = createAsyncThunk<string, { cardId: string }, { rejectValue: string }>(
  'cards/deleteCard',
  async ({cardId}, thunkAPI) => {
    try {
      await axios.delete(`/api/cards/${cardId}`);
      return cardId;
    } catch (e) {
        if (e instanceof Error) {
            return thunkAPI.rejectWithValue(e.message);
          }
          return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);