import { RootState } from "../store";

export const selectBoards = (state: RootState) => state.boards.boards;
export const selectCurrentBoard = (state: RootState) => state.boards.currentBoard;
export const selectIsLoading = (state: RootState) => state.boards.isLoading;
export const selectError = (state: RootState) => state.boards.error;
