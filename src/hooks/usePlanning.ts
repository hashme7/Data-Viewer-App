import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { useCallback, useMemo } from "react";
import { selectPlanningSales } from "../redux/selectors/planningMatrix";

/**
 * Custom hook for handling planning data in AG Grid.
 */
export const usePlanning = () => {
  // Selects necessary data from Redux store
  const planningData = useSelector(selectPlanningSales);
  const skus = useSelector((state: RootState) => state.skus);
  const stores = useSelector((state: RootState) => state.stores);

  /**
   * Retrieves the store name based on the store ID.
   * If store ID is not found, returns the store ID itself.
   */
  const getStoreName = useCallback(
    (storeId: string) => {
      const store = stores.find((s) => s.code === storeId);
      return store ? store.name : storeId;
    },
    [stores]
  );

  /**
   * Retrieves the SKU name based on the SKU ID.
   * If SKU ID is not found, returns the SKU ID itself.
   */
  const getSKUName = useCallback(
    (skuId: string) => {
      const sku = skus.find((s) => s.id === skuId);
      return sku ? sku.label : skuId;
    },
    [skus]
  );

  /**
   * Determines the cell background color based on GM percentage.
   */
  const getGmPercentCellStyle = (value: number) => {
    if (value >= 80) return { backgroundColor: "#86efac" }; // Green for high GM%
    if (value >= 60) return { backgroundColor: "#fde047" }; // Yellow for medium-high GM%
    if (value >= 40) return { backgroundColor: "#fb923c" }; // Orange for medium GM%
    return { backgroundColor: "#fca5a5" }; // Red for low GM%
  };

  /**
   * Creates column definitions for a given month, including week-based sub-columns.
   */
  const createMonthColumns = (
    month: string,
    monthLabel: string,
    weeksInMonth: string[]
  ): ColGroupDef => ({
    headerName: monthLabel,
    children: weeksInMonth.map((weekNumber) => ({
      headerName: `Week ${weekNumber.replace("W", "")}`,
      children: [
        {
          field: `${weekNumber}.salesUnits`,
          headerName: "Sales Units",
          type: "numericColumn",
          filter: "agNumberColumnFilter",
          valueFormatter: (params) => params.value?.toFixed(2),
          valueGetter: (params) => {
            const weekData = params.data.weeks[month]?.find(
              (w: any) => w.week === weekNumber
            );
            return weekData?.salesUnits;
          },
        },
        {
          field: `${weekNumber}.salesDollars`,
          headerName: "Sales Dollars",
          type: "numericColumn",
          valueFormatter: (params) =>
            params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00",
          valueGetter: (params) => {
            const weekData = params.data.weeks?.[month]?.find(
              (w: any) => w.week === weekNumber
            );
            return weekData?.salesDollars;
          },
        },
        {
          field: `${weekNumber}.gmDollars`,
          headerName: "GM Dollars",
          type: "numericColumn",
          valueFormatter: (params) =>
            params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00",
          valueGetter: (params) => {
            const weekData = params.data.weeks?.[month]?.find(
              (w: any) => w.week === weekNumber
            );
            return weekData?.gmDollars;
          },
        },
        {
          field: `${weekNumber}.gmPercent`,
          headerName: "GM Percentage",
          type: "numericColumn",
          valueFormatter: (params) =>
            params.value ? `${params.value.toFixed(2)}%` : "0.00%",
          cellStyle: (params) => getGmPercentCellStyle(params.value),
          valueGetter: (params) => {
            const weekData = params.data.weeks?.[month]?.find(
              (w: any) => w.week === weekNumber
            );
            return weekData?.gmPercentage;
          },
        },
      ],
    })),
  });

  /**
   * Extracts unique months with their corresponding weeks.
   */
  const weeksByMonth = useMemo(() => {
    const monthsMap = new Map<
      string,
      { monthLabel: string; weeks: string[] }
    >();

    planningData.forEach(({ weeks }) => {
      Object.entries(weeks).forEach(([month, weekArray]) => {
        if (!Array.isArray(weekArray)) return;
        weekArray.forEach(
          ({ week, monthLabel }: { week: string; monthLabel: string }) => {
            if (!monthsMap.has(month)) {
              monthsMap.set(month, { monthLabel, weeks: [] });
            }
            monthsMap.get(month)?.weeks.push(week);
          }
        );
      });
    });

    return Array.from(monthsMap.entries()).map(
      ([month, { monthLabel, weeks }]) => ({
        month,
        monthLabel,
        weeks: weeks.sort(),
      })
    );
  }, [planningData]);

  /**
   * Defines AG Grid column structure.
   */
  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
    () => [
      {
        field: "store",
        headerName: "Store",
        minWidth: 200,
        filter: true,
        sortable: true,
        valueFormatter: (params) => getStoreName(params.value),
      },
      {
        field: "sku",
        headerName: "SKU",
        minWidth: 200,
        filter: true,
        sortable: true,
        valueFormatter: (params) => getSKUName(params.value.label),
      },
      ...weeksByMonth.map(({ month, monthLabel, weeks }) =>
        createMonthColumns(month, monthLabel, weeks)
      ),
    ],
    [weeksByMonth]
  );

  /**
   * Default column properties for AG Grid.
   */
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      flex: 1,
    }),
    []
  );

  /**
   * Callback function to handle grid readiness.
   */
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
