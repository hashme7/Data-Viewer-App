import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPlanning, SKU } from "../../types/interfaces";

const selectSkus = (state: RootState) => state.skus;
const selectPlanning = (state: RootState) => state.planning;
const selectStores = (state: RootState) => state.stores;
const selectCalender = (state: RootState) => state.calender;

export const selectPlanningSales = createSelector(
  [selectSkus, selectPlanning, selectStores, selectCalender],
  (products, salesData, stores, calendar) => {
    const calendarMap = new Map();

    calendar.data.forEach((cal) => {
      if (!calendarMap.has(cal.week)) {
        calendarMap.set(cal.week, []);
      }
      calendarMap.get(cal.week).push(cal);
    });

    const groupedData = new Map();

    salesData.data.forEach((item: IPlanning) => {
      const storeName =
        stores.find((s) => s.code === item.store)?.name || item.store;

      const sku = products.find((s) => s.id == item.sku);
      const key = `${storeName}-${sku?.label}`;

      if (!groupedData.has(key)) {
        groupedData.set(key, {
          store: storeName,
          sku: sku,
          weeks: {},
        });
      }

      const row: { store: string; sku: SKU; weeks: Record<string, any> } =
        groupedData.get(key);

      if (calendarMap.has(item.week)) {
        const weekData = calendarMap.get(item.week);
        weekData.forEach(
          (cal: {
            seqNo: string;
            week: string;
            weekLabel: string;
            month: string;
            monthLabel: string;
          }) => {
            if (!row.weeks[cal.month]) {
              row.weeks[cal.month] = [];
            }
            const salesUnits = item.salesUnits ?? 0;
            const salesDollars = salesUnits * (sku?.price ?? 0);
            const costDollars = salesUnits * (sku?.cost ?? 0);
            const gmDollars = salesDollars - costDollars;
            const gmPercentage =
              salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;
            row.weeks[cal.month].push({
              ...cal,
              salesUnits,
              salesDollars,
              costDollars,
              gmDollars,
              gmPercentage,
            });
          }
        );
      }
    });
    return Array.from(groupedData.values());
  }
);
