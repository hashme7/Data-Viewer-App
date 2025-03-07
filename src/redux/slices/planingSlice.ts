import { createSlice } from "@reduxjs/toolkit";
import { PlanningData, RawPlanningData } from "../../types/interfaces/index";
import { planningData } from "../../constants/datas";

interface PlanningState {
  data: PlanningData[];
  loading: boolean;
  error: string | null;
}

const mockData: RawPlanningData[] = planningData;

const processRawData = (rawData: RawPlanningData[]): PlanningData[] => {
  const groupedData: { [key: string]: PlanningData } = {};

  rawData.forEach((item) => {
    const id = `${item.store}-${item.sku}`;
    if (!groupedData[id]) {
      groupedData[id] = {
        id,
        store: item.store,
        sku: item.sku,
        weeks: [],
      };
    }

    groupedData[id].weeks.push({
      week: item.week,
      salesUnits: item.salesUnits,
      salesDollars: item.salesDollars || 0,
      costDollars: item.costDollars || 0,
      gmDollars: item.gmDollars || 0,
      gmPercent: item.gmPercent || 0,
    });
  });

  return Object.values(groupedData);
};

const initialState: PlanningState = {
  data: processRawData(mockData),
  loading: false,
  error: null,
};
console.log(initialState);

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {},
});

export const {} = planningSlice.actions;
export default planningSlice.reducer;
