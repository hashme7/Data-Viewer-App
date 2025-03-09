import { createSlice } from "@reduxjs/toolkit";
import { IChart } from "../../types/interfaces";
import { chartData } from "../../constants/data/chart";

interface chartState {
  data: IChart[];
}
const initialState: chartState = {
  data: chartData,
};

const chart = createSlice({
  name: "chart",
  initialState,
  reducers: {},
});
export const {} = chart.actions;
export default chart.reducer;
