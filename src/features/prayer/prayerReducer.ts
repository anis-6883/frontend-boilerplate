import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPrayer, IPagination } from "@/types";

interface prayerState {
  prayers: IPrayer[];
  pagination: IPagination;
}

const initialState: prayerState = {
  prayers: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0,
  }
};

const prayerSlice = createSlice({
  name: "prayer",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IPrayer[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addPrayer: (state, action: PayloadAction<IPrayer>) => {
      state.prayers = [...state.prayers, action.payload];
    },
    updatePrayer: (state, action: PayloadAction<IPrayer>) => {
      state.prayers = state.prayers.map((item: IPrayer) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deletePrayer: (state, action: PayloadAction<{ id: string }>) => {
      state.prayers = state.prayers.filter((item: IPrayer) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addPrayer, updatePrayer, deletePrayer } = prayerSlice.actions;

export default prayerSlice.reducer;
