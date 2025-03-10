import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlanning } from "../../types/interfaces/index";
import { planning } from "../../constants/data/planningData";

interface updateSalesParams {
  store: number | string;
  sku: string;
  week: string;
  salesUnits: number;
}
interface PlanningState {
  data: IPlanning[];
}
const mockData: IPlanning[] = planning;
const initialState: PlanningState = {
  data: mockData,
};
const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    updateSalesUnits: (state, action: PayloadAction<updateSalesParams>) => {
      const { store, sku, week, salesUnits } = action.payload;
      console.log(store, sku, week, salesUnits);
      const item = state.data.find(
        (entry) =>
          entry.store === store && entry.sku === sku && entry.week === week
      );
      console.log(item,"item")

      if (item) {
        item.salesUnits = salesUnits; 
        console.log("success..")
      }
    },
  },
});

export const { updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;
