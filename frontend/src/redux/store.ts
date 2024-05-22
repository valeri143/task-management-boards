import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { boardsListReducer } from './boardsListSlice/boardsListSlice';
import { cardsListReducer } from './cardsListSlice/cardsListSlice';

export const store = configureStore({
  reducer: {
    boards: boardsListReducer,
    cards: cardsListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
