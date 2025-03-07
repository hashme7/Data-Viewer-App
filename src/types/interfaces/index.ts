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
  name: string;
  city: string;
  state: string;
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

export interface RawPlanningData {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
  salesDollars?: number;
  costDollars?: number;
  gmDollars?: number;
  gmPercent?: number;
}
