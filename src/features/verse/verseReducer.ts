// just a new file will be used later on
import { IPagination, IVerse } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface verseState {
  verses: IVerse[];
  pagination: IPagination;
}

const initialState: verseState = {
  verses: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0,
  }
};

const verseSlice = createSlice({
  name: "verse",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IVerse[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addVerse: (state, action: PayloadAction<IVerse>) => {
      state.verses = [...state.verses, action.payload];
    },
    updateVerse: (state, action: PayloadAction<IVerse>) => {
      state.verses = state.verses.map((item: IVerse) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteVerse: (state, action: PayloadAction<{ id: string }>) => {
      state.verses = state.verses.filter((item: IVerse) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addVerse, updateVerse, deleteVerse } = verseSlice.actions;

export default verseSlice.reducer;
