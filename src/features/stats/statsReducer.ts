import { IPagination } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type statsType = any

interface statsState {
  stats: statsType[];
}

const initialState: statsState = {
  stats: [],

};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: statsType[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
  }
});

export const { setValue } = statsSlice.actions;

export default statsSlice.reducer;
