import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../../types/interfaces/index";
import { Stores } from "../../constants/datas";

const initialState: Store[] = Stores;

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.push(action.payload);
    },
    deleteStore: (state, action: PayloadAction<number>) => {
      return state.filter((store) => store.id !== action.payload);
    },
  },
});

export const { addStore, deleteStore } = storeSlice.actions;
export default storeSlice.reducer;
