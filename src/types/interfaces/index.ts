export interface Store {
  id: number;
  code: string;
  name: string;
  city: string;
  state: string;
}
export interface SKU {
  id: string;
  label: string;
  class: string;
  department: string;
  price: number;
  cost: number;
}

export interface StoreInput {
  id?:number,
  name: string;
  city: string;
  state: string;
  code:string,
}

export interface WeekData {
  week: string;
  salesUnits: number;
  salesDollars: number;
  costDollars: number;
  gmDollars: number;
  gmPercent: number;
}

export interface PlanningData {
  id: string;
  store: string;
  sku: string;
  weeks: WeekData[];
}

export interface IPlanning {
  store: string;
  sku: string;
  week: string;
  salesUnits: null | number;
}

export interface ChartProps{
  selectedStore:string
}
export interface ICalender {
  seqNo: number;
  week: string;
  weekLabel: string;
  month: string;
  monthLabel: string;
}
export interface IChart{
  week: string,
  gmDollars: number,
  salesDollars: number,
  gmPercentage:number,
}