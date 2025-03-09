import { createSlice } from "@reduxjs/toolkit";
import { IPlanning } from "../../types/interfaces/index";
import { planning } from "../../constants/data/planningData";

interface PlanningState {
  data: IPlanning[];
}
const mockData: IPlanning[] = planning;
const initialState: PlanningState = {
  data: mockData
};
const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {},
});

export const {} = planningSlice.actions;
export default planningSlice.reducer;
