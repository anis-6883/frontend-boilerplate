import { IPagination, IVersion } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface versionState {
  versions: IVersion[];
  pagination: IPagination;
}

const initialState: versionState = {
  versions: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0
  }
};

const versionSlice = createSlice({
  name: "version",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IVersion[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addVersion: (state, action: PayloadAction<IVersion>) => {
      state.versions = [...state.versions, action.payload];
    },
    updateVersion: (state, action: PayloadAction<IVersion>) => {
      state.versions = state.versions.map((item: IVersion) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteVersion: (state, action: PayloadAction<{ id: string }>) => {
      state.versions = state.versions.filter((item: IVersion) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addVersion, updateVersion, deleteVersion } = versionSlice.actions;

export default versionSlice.reducer;
