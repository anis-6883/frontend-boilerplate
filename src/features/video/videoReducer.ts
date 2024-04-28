import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVideo, IPagination } from "@/types";

interface videoState {
  videos: IVideo[];
  pagination: IPagination;
  channelId: string;
}

const initialState: videoState = {
  videos: [],
  pagination: {
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    totalDocs: 0,
  },
  channelId: ""
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ target: string; value: IVideo[] | Boolean | IPagination }>) => {
      // @ts-ignore - Ignore TypeScript error as the types are correct
      state[action.payload.target] = action.payload.value;
    },
    addVideo: (state, action: PayloadAction<IVideo>) => {
      state.videos = [...state.videos, action.payload];
    },
    updateVideo: (state, action: PayloadAction<IVideo>) => {
      state.videos = state.videos.map((item: IVideo) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    },
    deleteVideo: (state, action: PayloadAction<{ id: string }>) => {
      state.videos = state.videos.filter((item: IVideo) => item.id !== action.payload.id);
    },
    addChannelId: (state, action) => {
      state.channelId = action.payload;
    }
  }
});

export const { setValue, addVideo, updateVideo, deleteVideo, addChannelId } = videoSlice.actions;

export default videoSlice.reducer;
