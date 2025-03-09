import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  BarController,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";
import { useChart } from "../hooks/useChart";

// Register required Chart.js components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController
);

const Chart: React.FC = () => {
  // Extract necessary values from the custom hook
  const {
    options,
    data,
    storesData,
    getStoreName,
    selectedStore,
    setSelectedStore,
  } = useChart();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#2B2B2B] p-4 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto">
        {/* Store selection dropdown */}
        <div className="relative inline-block text-left mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
          >
            <span>{getStoreName(selectedStore)}</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
              <div className="py-1">
                {storesData.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => {
                      setSelectedStore(store.code);
                      setIsOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  >
                    {getStoreName(store.code)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full max-w-5xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] p-4">
        <Bar options={options} data={data as ChartData<"bar">} />
      </div>
    </div>
  );
};

export default Chart;
