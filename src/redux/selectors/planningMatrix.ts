import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPlanning, SKU } from "../../types/interfaces";

const selectSkus = (state: RootState) => state.skus;
const selectPlanning = (state: RootState) => state.planning;
const selectStores = (state: RootState) => state.stores;
const selectCalendar = (state: RootState) => state.calender;

export const selectPlanningSales = createSelector(
  [selectSkus, selectPlanning, selectStores, selectCalendar],
  (products, salesData, stores, calendar) => {
    const calendarMap = new Map<string, any>();

    // Ensure weeks are stored uniquely per month
    calendar.data.forEach((cal) => {
      if (!calendarMap.has(cal.week)) {
        calendarMap.set(cal.week, { ...cal });
      }
    });
    calendarMap.forEach((x) => console.log(x, "amp"));

    const groupedData = new Map<
      string,
      {
        store: string;
        sku: SKU | null;
        weeks: Record<string, any>;
      }
    >();

    // Process sales data
    salesData.data.forEach((item: IPlanning) => {
      const storeName =
        stores.find((s) => s.code === item.store)?.name || item.store;
      const sku = products.find((s) => s.id === item.sku) || null;
      const key = `${storeName}-${sku?.label}`;

      if (!groupedData.has(key)) {
        groupedData.set(key, { store: storeName, sku, weeks: {} });
      } 

      const row = groupedData.get(key)!;

      if (calendarMap.has(item.week)) {
        const cal = calendarMap.get(item.week);
        if (!row.weeks[cal.month]) {
          row.weeks[cal.month] = new Map();
        }
        if (!row.weeks[cal.month].has(cal.week)) {
          const salesUnits = item.salesUnits ?? 0;
          const salesDollars = salesUnits * (sku?.price ?? 0);
          const costDollars = salesUnits * (sku?.cost ?? 0);
          const gmDollars = salesDollars - costDollars;
          const gmPercentage =
            salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;

          row.weeks[cal.month].set(cal.week, {
            ...cal,
            salesUnits,
            salesDollars,
            costDollars,
            gmDollars,
            gmPercentage,
          });
        } 
      }
    });

    // Convert weeks maps to arrays
    groupedData.forEach((data) => {
      Object.keys(data.weeks).forEach((month) => {
        data.weeks[month] = Array.from(data.weeks[month].values());
      });
    });

    return Array.from(groupedData.values());
  }
);
