import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILanguage, IPagination } from "@/types";

interface languageState {
  languages: ILanguage[];
  pagination: IPagination;
}

const initialState: languageState = {
  languages: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0,
  }
};

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: ILanguage[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addLanguage: (state, action: PayloadAction<ILanguage>) => {
      state.languages = [...state.languages, action.payload];
    },
    updateLanguage: (state, action: PayloadAction<ILanguage>) => {
      state.languages = state.languages.map((item: ILanguage) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteLanguage: (state, action: PayloadAction<{ id: string }>) => {
      state.languages = state.languages.filter((item: ILanguage) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addLanguage, updateLanguage, deleteLanguage } = languageSlice.actions;

export default languageSlice.reducer;
