import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slices/storeSlice";
import skuReducer from "./slices/skuSlice";
import planningReducer from "./slices/planingSlice";
import calender from './slices/calender';

export const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
    planning: planningReducer,
    calender: calender,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
