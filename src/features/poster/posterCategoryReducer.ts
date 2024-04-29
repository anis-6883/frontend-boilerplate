import { IPagination, IPosterCategory } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface posterCategoryState {
  posterCategories: IPosterCategory[];
  pagination: IPagination;
}

const initialState: posterCategoryState = {
  posterCategories: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0
  }
};

const posterCategorySlice = createSlice({
  name: "posterCategories",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IPosterCategory[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addPosterCategory: (state, action: PayloadAction<IPosterCategory>) => {
      state.posterCategories = [...state.posterCategories, action.payload];
    },
    updatePosterCategory: (state, action: PayloadAction<IPosterCategory>) => {
      state.posterCategories = state.posterCategories.map((item: IPosterCategory) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
    deletePosterCategory: (state, action: PayloadAction<{ id: string }>) => {
      state.posterCategories = state.posterCategories.filter((item: IPosterCategory) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addPosterCategory, updatePosterCategory, deletePosterCategory } = posterCategorySlice.actions;

export default posterCategorySlice.reducer;
