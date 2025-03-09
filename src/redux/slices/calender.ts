import { createSlice } from "@reduxjs/toolkit";
import { Calender } from "../../constants/data/calender";
import { ICalender } from "../../types/interfaces";

interface CalenderState {
  data: ICalender[];
}
const initialState: CalenderState = {
  data: Calender,
};
const CalenderState = createSlice({
  name: "Calender",
  initialState,
  reducers: {},
});

export const {} = CalenderState.actions;
export default CalenderState.reducer;
