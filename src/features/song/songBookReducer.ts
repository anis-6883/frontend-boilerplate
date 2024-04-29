import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISongBook, IPagination } from "@/types";

interface songBookState {
  songBooks: ISongBook[];
  pagination: IPagination;
}

const initialState: songBookState = {
  songBooks: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0
  }
};

const songBookSlice = createSlice({
  name: "songBooks",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: ISongBook[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addSongBook: (state, action: PayloadAction<ISongBook>) => {
      state.songBooks = [...state.songBooks, action.payload];
    },
    updateSongBook: (state, action: PayloadAction<ISongBook>) => {
      state.songBooks = state.songBooks.map((item: ISongBook) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteSongBook: (state, action: PayloadAction<{ id: string }>) => {
      state.songBooks = state.songBooks.filter((item: ISongBook) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addSongBook, updateSongBook, deleteSongBook } = songBookSlice.actions;

export default songBookSlice.reducer;
