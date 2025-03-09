import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ChartData, ChartOptions } from "chart.js";
import { useMemo, useState } from "react";
import { IPlanning, Store, SKU } from "../types/interfaces";

export const useChart = () => {
  const storesData = useSelector((state: RootState) => state.stores);
  const skusData = useSelector((state: RootState) => state.skus);
  const planningData = useSelector((state: RootState) => state.planning.data);
  const calendarData = useSelector((state: RootState) => state.calender.data);

  const storeCodes = useMemo(
    () => storesData.map((store: Store) => store.code),
    [storesData]
  );
  const [selectedStore, setSelectedStore] = useState(storeCodes[0] || "");

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStore(event.target.value);
  };

  const getStoreName = (storeCode: string) => {
    return (
      storesData.find((store: Store) => store.code === storeCode)?.name ||
      "Unknown Store"
    );
  };

  const chartData = useMemo(() => {
    if (!selectedStore) return [];

    const filteredPlanning = planningData.filter(
      (data: IPlanning) => data.store === selectedStore
    );

    const weeklyData: Record<
      string,
      { gmDollars: number; salesDollars: number }
    > = {};

    filteredPlanning.forEach((item) => {
      const skuDetails = skusData.find((sku: SKU) => sku.id === item.sku);
      if (!skuDetails) return;

      const salesDollars = item.salesUnits * skuDetails.price;
      const gmDollars = salesDollars - item.salesUnits * skuDetails.cost;

      if (!weeklyData[item.week]) {
        weeklyData[item.week] = { gmDollars: 0, salesDollars: 0 };
      }

      weeklyData[item.week].gmDollars += gmDollars;
      weeklyData[item.week].salesDollars += salesDollars;
    });

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

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
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
            if (tooltipItem.datasetIndex === 0) {
              return `GM Dollars: $${value.toLocaleString()}`;
            } else {
              return `GM %: ${value.toFixed(2)}%`; 
            }
          },
        },
      },
    },
  };

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
