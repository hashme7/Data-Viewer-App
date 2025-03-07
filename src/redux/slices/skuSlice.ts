import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SKU } from "../../types/interfaces";
import { Skus } from "../../constants/datas";

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
  },
});

export const { addSKU, deleteSKU } = storeSlice.actions;
export default storeSlice.reducer;
