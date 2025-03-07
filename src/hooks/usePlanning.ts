import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { useCallback, useMemo } from "react";

export const usePlanning = () => {
  const planningData = useSelector((state: RootState) => state.planning.data);
  const getGmPercentCellStyle = (value: number) => {
    if (value >= 80) return { backgroundColor: "#86efac" };
    if (value >= 60) return { backgroundColor: "#fde047" };
    if (value >= 40) return { backgroundColor: "#fb923c" };
    return { backgroundColor: "#fca5a5" };
  };
  const createWeekColumns = (weekNumber: string): ColGroupDef => ({
    headerName: `Week ${weekNumber.replace("W", "")}`,
    children: [
      {
        field: `${weekNumber}.salesUnits`,
        headerName: "Sales Units",
        type: "numericColumn",
        filter: "agNumberColumnFilter",
        valueFormatter: (params: { value: number }) => params.value?.toFixed(2),
        valueGetter: (params: { data: { weeks: any[] } }) => {
          const weekData = params.data.weeks?.find(
            (w: any) => w.week === weekNumber
          );
          return weekData?.salesUnits;
        },
      },
      {
        field: `${weekNumber}.salesDollars`,
        headerName: "Sales Dollars",
        type: "numericColumn",
        valueFormatter: (params: { value: number }) =>
          params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00",
        valueGetter: (params: { data: { weeks: any[] } }) => {
          const weekData = params.data.weeks?.find(
            (w: any) => w.week === weekNumber
          );
          return weekData?.salesDollars;
        },
      },
      {
        field: `${weekNumber}.gmDollars`,
        headerName: "GM Dollars",
        type: "numericColumn",
        valueFormatter: (params: { value: number }) =>
          params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00",
        valueGetter: (params: { data: { weeks: any[] } }) => {
          const weekData = params.data.weeks?.find(
            (w: any) => w.week === weekNumber
          );
          return weekData?.gmDollars;
        },
      },
      {
        field: `${weekNumber}.gmPercent`,
        headerName: "GM Percent",
        type: "numericColumn",
        valueFormatter: (params: { value: number }) =>
          params.value ? `${params.value.toFixed(2)}%` : "0.00%",
        cellStyle: (params: { value: number }) =>
          getGmPercentCellStyle(params.value),
        valueGetter: (params: { data: { weeks: any[] } }) => {
          const weekData = params.data.weeks?.find(
            (w: any) => w.week === weekNumber
          );
          return weekData?.gmPercent;
        },
      },
    ],
  });
  const uniqueWeeks = useMemo(() => {
    const weeks = new Set<string>();
    planningData.forEach((item) => {
      item.weeks.forEach((week) => weeks.add(week.week));
    });
    return Array.from(weeks).sort();
  }, [planningData]);

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
    () => [
      {
        field: "store",
        headerName: "Store",
        minWidth: 200,
        filter: true,
        sortable: true,
      },
      {
        field: "sku",
        headerName: "SKU",
        minWidth: 200,
        filter: true,
        sortable: true,
      },
      ...uniqueWeeks.map((week) => createWeekColumns(week)),
    ],
    [uniqueWeeks]
  );
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      flex: 1,
    }),
    []
  );

  const onGridReady = useCallback(() => {
    console.log("Grid is ready");
  }, []);
  return {
    planningData,
    columnDefs,
    defaultColDef,
    onGridReady,
  };
};
