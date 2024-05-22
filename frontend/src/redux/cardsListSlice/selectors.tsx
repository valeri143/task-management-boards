import { RootState } from "../store"; 

export const selectCards = (state: RootState) => state.cards.cards;
export const selectIsLoading = (state: RootState) => state.cards.isLoading;
export const selectError = (state: RootState) => state.cards.error;
