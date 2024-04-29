import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISong, IPagination } from "@/types";

interface songState {
  songs: ISong[];
  pagination: IPagination;
}

const initialState: songState = {
  songs: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0
  }
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: ISong[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addSong: (state, action: PayloadAction<ISong>) => {
      state.songs = [...state.songs, action.payload];
    },
    updateSong: (state, action: PayloadAction<ISong>) => {
      state.songs = state.songs.map((item: ISong) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteSong: (state, action: PayloadAction<{ id: string }>) => {
      state.songs = state.songs.filter((item: ISong) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addSong, updateSong, deleteSong } = songSlice.actions;

export default songSlice.reducer;
