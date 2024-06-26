import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCardById, addCard, editCard, deleteCard, updateCardStatus } from "./operations";
import { CardsState, Task } from "../types/types";

const initialState: CardsState = {
    cards: [],
    isLoading: false,
    error: null,
  };

const handlePending = (state: CardsState) => {
    state.isLoading = true;
};
  
const handleRejected = (state: CardsState, action: PayloadAction<string | undefined>) => {
    state.isLoading = false;
    state.error = action.payload || 'Unknown error';
};

const cardsListSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
      resetCards(state) {
        state.cards = [];
        state.error = null;
        state.isLoading = false;
      },
      removeCardsByBoardId(state, action: PayloadAction<string>) {
        state.cards = state.cards.filter(card => card.boardId !== action.payload);
      }
    },
    extraReducers: builder => {
        builder
          .addCase(getCardById.pending, handlePending)
          .addCase(getCardById.fulfilled, (state, action: PayloadAction<Task>) => {
            state.isLoading = false;
            const uniqueCardIds = new Set(state.cards.map((card) => card._id));
        if (!uniqueCardIds.has(action.payload._id)) {
          state.cards.push(action.payload);
        }
            state.error = null;
          })
          .addCase(getCardById.rejected, handleRejected)
          .addCase(addCard.pending, handlePending)
          .addCase(addCard.fulfilled, (state, action: PayloadAction<Task>) => {
            state.isLoading = false;
            if (!state.cards.some(card => card._id === action.payload._id)) {
                  state.cards.push(action.payload);
               }
            state.error = null;
          })
          .addCase(addCard.rejected, handleRejected)
          .addCase(editCard.pending, handlePending)
          .addCase(editCard.fulfilled, (state, action: PayloadAction<Task>) => {
            state.isLoading = false;
            const index = state.cards.findIndex(card => card._id === action.payload._id);
            if (index !== -1) {
              state.cards[index] = action.payload;
            }
            state.error = null;
          })
          .addCase(editCard.rejected, handleRejected)
          .addCase(deleteCard.pending, handlePending)
          .addCase(deleteCard.fulfilled, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.cards = state.cards.filter(card => card._id !== action.payload);
            state.error = null;
          })
          .addCase(deleteCard.rejected, handleRejected)
          .addCase(updateCardStatus.pending, handlePending)
          .addCase(updateCardStatus.fulfilled, (state, action: PayloadAction<Task>) => {
            state.isLoading = false;
             const index = state.cards.findIndex(card => card._id === action.payload._id);
            if (index !== -1) {
                state.cards[index] = action.payload;
             }
                 state.error = null;
           })
      .addCase(updateCardStatus.rejected, handleRejected);
      }
});

export const { resetCards, removeCardsByBoardId } = cardsListSlice.actions;
export const cardsListReducer = cardsListSlice.reducer;