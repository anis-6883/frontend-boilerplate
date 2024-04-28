import { IPagination, IQaCategory } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface qaCategoryState {
  qaCategories: IQaCategory[];
  pagination: IPagination;
}

const initialState: qaCategoryState = {
  qaCategories: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0,
  }
};

const qaCategorySlice = createSlice({
  name: "qaCategories",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IQaCategory[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addQaCategory: (state, action: PayloadAction<IQaCategory>) => {
      state.qaCategories = [...state.qaCategories, action.payload];
    },
    updateQaCategory: (state, action: PayloadAction<IQaCategory>) => {
      state.qaCategories = state.qaCategories.map((item: IQaCategory) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteQaCategory: (state, action: PayloadAction<{ id: string }>) => {
      state.qaCategories = state.qaCategories.filter((item: IQaCategory) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addQaCategory, updateQaCategory, deleteQaCategory } = qaCategorySlice.actions;

export default qaCategorySlice.reducer;
