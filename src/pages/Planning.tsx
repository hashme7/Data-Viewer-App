import React from "react";
import { usePlanning } from "../hooks/usePlanning";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  RowDragModule,
} from "ag-grid-community";

// Register AG Grid modules required for functionality
ModuleRegistry.registerModules([
  ClientSideRowModelModule, 
  AllCommunityModule, 
  RowDragModule, 
]);

/**
 * Planning Component
 * This component displays planning data using AG Grid.
 */
const Planning: React.FC = () => {
  // Custom hook to manage planning-related data and grid configurations
  const { planningData, columnDefs, defaultColDef, onGridReady } =
    usePlanning();

  return (
    // Wrapper div with height calculated dynamically to fit viewport
    <div className="h-[calc(100vh-12rem)] w-full ag-theme-alpine">
      {/* AG Grid Component for displaying planning data */}
      <AgGridReact
        rowData={planningData} 
        columnDefs={columnDefs} 
        defaultColDef={defaultColDef} 
        onGridReady={onGridReady} 
        animateRows={true} 
      />
    </div>
  );
};

export default Planning;
