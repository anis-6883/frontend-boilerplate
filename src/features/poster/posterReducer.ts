import { IPagination, IPoster } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface posterState {
  posters: IPoster[];
  pagination: IPagination;
}

const initialState: posterState = {
  posters: [],
  pagination: {
    totalDocs: 0,
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false
  }
};

const posterSlice = createSlice({
  name: "posters",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IPoster[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addPoster: (state, action: PayloadAction<IPoster>) => {
      state.posters = [...state.posters, action.payload];
    },
    updatePoster: (state, action: PayloadAction<IPoster>) => {
      state.posters = state.posters.map((item: IPoster) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deletePoster: (state, action: PayloadAction<{ id: string }>) => {
      state.posters = state.posters.filter((item: IPoster) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addPoster, updatePoster, deletePoster } = posterSlice.actions;

export default posterSlice.reducer;
