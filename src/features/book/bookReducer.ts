import { IBook, IPagination } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface bookState {
  books: IBook[];
  pagination: IPagination;
}

const initialState: bookState = {
  books: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0
  }
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IBook[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addBook: (state, action: PayloadAction<IBook>) => {
      state.books = [...state.books, action.payload];
    },
    updateBook: (state, action: PayloadAction<IBook>) => {
      state.books = state.books.map((item: IBook) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteBook: (state, action: PayloadAction<{ id: string }>) => {
      state.books = state.books.filter((item: IBook) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addBook, updateBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;
