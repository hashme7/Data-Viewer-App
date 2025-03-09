import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SKU } from "../../types/interfaces";
import { Skus } from "../../constants/data/Skus";

const initialState: SKU[] = Skus;

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.push(action.payload);
    },
    deleteSKU: (state, action: PayloadAction<string>) => {
      return state.filter((sku: SKU) => sku.id !== action.payload);
    },
    editSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addSKU, deleteSKU, editSKU } = storeSlice.actions;
export default storeSlice.reducer;

