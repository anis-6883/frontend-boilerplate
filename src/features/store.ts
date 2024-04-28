import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./auth/authSlice";
import contentReducer from "./contentManagement/contentReducer";
import dailyMannaReducer from "./daily-manna/dailyMannaSlice";
import languageReducer from "./language/languageReducer";
import prayerReducer from "./prayer/prayerReducer";
import songBookReducer from "./song/songBookReducer";
import songReducer from "./song/songReducer";
import statsReducer from "./stats/statsReducer";
import userReducer from "./user/userReducer";
import videoCategoryReducer from "./video/videoCategoryReducer";
import videoReducer from "./video/videoReducer";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authSlice: authSlice.reducer,
    userStore: userReducer,
    contentStore: contentReducer,
    prayerStore: prayerReducer,
    languageStore: languageReducer,
    songStore: songReducer,
    songBookStore: songBookReducer,
    videoStore: videoReducer,
    videoCategoryStore: videoCategoryReducer,
    dailyMannaStore: dailyMannaReducer,
    statsStore: statsReducer
  },
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
