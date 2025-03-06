import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from '../../types/store/store.interface';

const initialState: Store[] = [
  { id: 1, store: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  { id: 2, store: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
  { id: 3, store: "Houston Harvest Market", city: "Houston", state: "TX" },
  { id: 4, store: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
  { id: 5, store: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { id: 6, store: "Denver Peaks Outdoor", city: "Denver", state: "CO" },
  { id: 7, store: "Boston Harbor Books", city: "Boston", state: "MA" },
  { id: 8, store: "Los Angeles Luxe", city: "Los Angeles", state: "CA" },
  { id: 9, store: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
  {
    id: 10,
    store: "Nashville Melody Music Store",
    city: "Nashville",
    state: "TN",
  },
  { id: 11, store: "New York Empire Eats", city: "New York", state: "NY" },
  { id: 12, store: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
  {
    id: 13,
    store: "San Francisco Bay Trends",
    city: "San Francisco",
    state: "CA",
  },
];

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
