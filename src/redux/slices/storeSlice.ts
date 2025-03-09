import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../../types/interfaces/index";
import { Stores } from "../../constants/data/stores";

const initialState: Store[] = Stores;

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.push(action.payload);
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.findIndex((store) => store.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteStore: (state, action: PayloadAction<number>) => {
      return state.filter((store) => store.id !== action.payload);
    },
  },
});

export const { addStore, deleteStore ,updateStore} = storeSlice.actions;
export default storeSlice.reducer;
