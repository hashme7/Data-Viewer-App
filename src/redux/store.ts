import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slices/storeSlice"; 

export const store = configureStore({
  reducer: {
    stores: storeReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
