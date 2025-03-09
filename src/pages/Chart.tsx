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
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useChart } from "../hooks/useChart";
import { ChartData } from "chart.js";
import { ChevronDown } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC = () => {
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
    <div className="min-h-screen w-full bg-[#2B2B2B] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative inline-block text-left mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex justify-between items-center w-[250px] px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
          >
            <span>{getStoreName(selectedStore)}</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-[250px] bg-white rounded-md shadow-lg">
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
      <div className="w-full h-[600px] p-4">
        <Bar options={options} data={data as ChartData<"bar">} />
      </div>
    </div>
  );
};
export default Chart;
