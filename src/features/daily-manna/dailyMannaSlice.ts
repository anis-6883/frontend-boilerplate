import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDailyManna, IPagination } from "@/types";

interface DailyMannaState {
  dailyMannas: IDailyManna[];
  pagination: IPagination;
}

const initialState: DailyMannaState = {
  dailyMannas: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0
  }
};

const dailyMannaSlice = createSlice({
  name: "dailyManna",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IDailyManna[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addDailyManna: (state, action: PayloadAction<IDailyManna>) => {
      state.dailyMannas = [...state.dailyMannas, action.payload];
    },
    updateDailyManna: (state, action: PayloadAction<IDailyManna>) => {
      state.dailyMannas = state.dailyMannas.map((item: IDailyManna) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
    deleteDailyManna: (state, action: PayloadAction<{ id: string }>) => {
      state.dailyMannas = state.dailyMannas.filter((item: IDailyManna) => item.id !== action.payload.id);
    }
  }
});

export const { setValue, addDailyManna, updateDailyManna, deleteDailyManna } = dailyMannaSlice.actions;

export default dailyMannaSlice.reducer;
