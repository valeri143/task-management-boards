export interface BoardType {
    _id: string;
    name: string;
    ToDo: string[];
    InProgress: string[];
    Done: string[];
  }

export interface Task {
        _id: string;
        title: string;
        description: string;
        column: string;
        boardId: string;
  }
  
export interface ApiResponse<T> {
    data: T;
  }
  
export interface BoardsState {
    boards: BoardType[];
    currentBoard: BoardType | null;
    isLoading: boolean;
    error: string | null;
  }

export interface CardsState {
    cards: Task[];
    isLoading: boolean;
    error: string | null;
  }