import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ChartData, ChartOptions } from "chart.js";
import { useMemo, useState } from "react";
import { IPlanning, Store, SKU } from "../types/interfaces";

export const useChart = () => {
  // Select store-related data from Redux state
  const storesData = useSelector((state: RootState) => state.stores || []);
  const skusData = useSelector((state: RootState) => state.skus || []);
  const planningData = useSelector(
    (state: RootState) => state.planning.data || []
  );
  const calendarData = useSelector(
    (state: RootState) => state.calender.data || []
  );

  // Extract store codes from storesData for selection dropdown
  const storeCodes = useMemo(
    () => storesData.map((store: Store) => store.code),
    [storesData]
  );

  // State to track currently selected store
  const [selectedStore, setSelectedStore] = useState(storeCodes[0] || "");

  /**
   * Handles store selection change event.
   * @param event - The event object from the select dropdown.
   */
  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStore(event.target.value);
  };

  /**
   * Retrieves the store name based on its store code.
   * @param storeCode - The code of the store.
   * @returns The name of the store or "Unknown Store" if not found.
   */
  const getStoreName = (storeCode: string) => {
    return (
      storesData.find((store: Store) => store.code === storeCode)?.name ||
      "Unknown Store"
    );
  };

  /**
   * Computes chart data for the selected store.
   */
  const chartData = useMemo(() => {
    if (!selectedStore) return [];

    // Filter planning data to include only data for the selected store
    const filteredPlanning = planningData.filter(
      (data: IPlanning) => data.store === selectedStore
    );

    // Aggregated weekly data storage
    const weeklyData: Record<
      string,
      { gmDollars: number; salesDollars: number }
    > = {};

    // Process each planning entry to compute sales and GM (Gross Margin) dollars
    filteredPlanning.forEach((item) => {
      const skuDetails = skusData.find((sku: SKU) => sku.id === item.sku);
      if (!skuDetails) return;

      const salesDollars = item.salesUnits * skuDetails.price;
      const gmDollars = salesDollars - item.salesUnits * skuDetails.cost;

      // Aggregate weekly data
      if (!weeklyData[item.week]) {
        weeklyData[item.week] = { gmDollars: 0, salesDollars: 0 };
      }

      weeklyData[item.week].gmDollars += gmDollars;
      weeklyData[item.week].salesDollars += salesDollars;
    });

    // Transform aggregated data into chart-compatible format
    return Object.entries(weeklyData).map(([week, values]) => {
      const weekLabel =
        calendarData.find((cal) => cal.week === week)?.weekLabel || week;
      const gmPercentage =
        values.salesDollars > 0
          ? (values.gmDollars / values.salesDollars) * 100
          : 0;

      return {
        week,
        weekLabel,
        gmDollars: Math.round(values.gmDollars),
        salesDollars: Math.round(values.salesDollars),
        gmPercentage: parseFloat(gmPercentage.toFixed(2)),
      };
    });
  }, [selectedStore, planningData, skusData, calendarData]);

  /**
   * Chart.js dataset configuration for bar and line charts.
   */
  const data: ChartData<"bar" | "line"> = {
    labels: chartData.map((item) => item.weekLabel),
    datasets: [
      {
        label: "GM Dollars",
        data: chartData.map((item) => item.gmDollars),
        backgroundColor: "#5AA9E6",
        borderRadius: 5,
        yAxisID: "y",
        type: "bar",
      },
      {
        label: "GM %",
        data: chartData.map((item) => item.gmPercentage),
        borderColor: "#FF8C42",
        backgroundColor: "#FF8C42",
        borderWidth: 2,
        type: "line",
        yAxisID: "percentage",
        tension: 0.4,
      },
    ],
  };

  /**
   * Chart.js configuration options including scales, legends, and tooltips.
   */
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#FFFFFF80", font: { size: 10 } },
      },
      y: {
        type: "linear",
        position: "left",
        grid: { color: "#FFFFFF1A" },
        ticks: {
          color: "#FFFFFF80",
          callback: (value) => `$${value.toLocaleString()}`,
          font: { size: 12 },
        },
        min: 0,
      },
      percentage: {
        type: "linear",
        position: "right",
        grid: { display: false },
        ticks: {
          color: "#FFFFFF80",
          callback: (value) => `${value}%`,
          font: { size: 12 },
        },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: { color: "#FFFFFF", usePointStyle: true, padding: 20 },
      },
      title: {
        display: true,
        text: `Gross Margin - ${getStoreName(selectedStore)}`,
        color: "#FFFFFF",
        font: { size: 16, weight: "bold" },
        padding: { top: 20, bottom: 20 },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw as number;
            return tooltipItem.datasetIndex === 0
              ? `GM Dollars: $${value.toLocaleString()}`
              : `GM %: ${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  // Return computed chart configurations and helper functions
  return {
    data,
    options,
    storesData,
    setSelectedStore,
    selectedStore,
    getStoreName,
    handleStoreChange,
  };
};
