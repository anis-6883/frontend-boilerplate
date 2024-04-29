import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVideoCategory, IPagination } from "@/types";

interface videoCategoryState {
  videoCategories: IVideoCategory[];
  pagination: IPagination;
}

const initialState: videoCategoryState = {
  videoCategories: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0
  }
};

const videoCategorySlice = createSlice({
  name: "videoCategories",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IVideoCategory[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addVideoCategory: (state, action: PayloadAction<IVideoCategory>) => {
      state.videoCategories = [...state.videoCategories, action.payload];
    },
    updateVideoCategory: (state, action: PayloadAction<IVideoCategory>) => {
      state.videoCategories = state.videoCategories.map((item: IVideoCategory) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
    deleteVideoCategory: (state, action: PayloadAction<{ id: string }>) => {
      state.videoCategories = state.videoCategories.filter((item: IVideoCategory) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addVideoCategory, updateVideoCategory, deleteVideoCategory } = videoCategorySlice.actions;

export default videoCategorySlice.reducer;
