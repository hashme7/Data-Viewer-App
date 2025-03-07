import React from "react";
import { usePlanning } from "../hooks/usePlanning";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, RowDragModule } from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  AllCommunityModule,
  RowDragModule,
]);

const Planning: React.FC = () => {
  const { planningData, columnDefs, defaultColDef, onGridReady } =
    usePlanning();
  return (
    <div className="h-[calc(100vh-12rem)] w-full ag-theme-alpine">
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
