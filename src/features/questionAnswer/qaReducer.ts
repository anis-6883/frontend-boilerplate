import { IPagination, IQa } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface qaState {
  qas: IQa[];
  pagination: IPagination;
}

const initialState: qaState = {
  qas: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0,
  }
};

const qaSlice = createSlice({
  name: "qas",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IQa[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addQa: (state, action: PayloadAction<IQa>) => {
      state.qas = [...state.qas, action.payload];
    },
    updateQa: (state, action: PayloadAction<IQa>) => {
      state.qas = state.qas.map((item: IQa) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteQa: (state, action: PayloadAction<{ id: string }>) => {
      state.qas = state.qas.filter((item: IQa) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addQa, updateQa, deleteQa } = qaSlice.actions;

export default qaSlice.reducer;
