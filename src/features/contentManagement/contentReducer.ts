import { IContent, IPagination } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContentState {
  contents: IContent[];
  pagination: IPagination;
}

const initialState: ContentState = {
  contents: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0,
  }
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IContent[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addContent: (state, action: PayloadAction<IContent>) => {
      state.contents = [...state.contents, action.payload];
    },
    updateContent: (state, action: PayloadAction<IContent>) => {
      state.contents = state.contents.map((item: IContent) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteContent: (state, action: PayloadAction<{ id: string }>) => {
      state.contents = state.contents.filter((item: IContent) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addContent, updateContent, deleteContent } = contentSlice.actions;

export default contentSlice.reducer;
