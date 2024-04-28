// just a new file will be used later on
import { IChapter, IPagination } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface chapterState {
  chapters: IChapter[];
  pagination: IPagination;
}

const initialState: chapterState = {
  chapters: [],
  pagination: {
    totalDocs: 0,
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false
  }
};

const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IChapter[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addChapter: (state, action: PayloadAction<IChapter>) => {
      state.chapters = [...state.chapters, action.payload];
    },
    updateChapter: (state, action: PayloadAction<IChapter>) => {
      state.chapters = state.chapters.map((item: IChapter) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteChapter: (state, action: PayloadAction<{ id: string }>) => {
      state.chapters = state.chapters.filter((item: IChapter) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addChapter, updateChapter, deleteChapter } = chapterSlice.actions;

export default chapterSlice.reducer;
