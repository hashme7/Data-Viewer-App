import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  RowDragModule,
  ColDef
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  AllCommunityModule,
  RowDragModule,
]);

import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../css/Table.css";
import { useSku } from "../hooks/useSku";
import Modal from "../components/Modal";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  AllCommunityModule,
  RowDragModule,
]);

const SKU: React.FC = () => {
  const skus = useSelector((state: RootState) => state.skus);
  const { deleteSku, openModal, modalOpen, addSku, handleCloseModal } =
    useSku();

  const labelRef = useRef<HTMLInputElement>(null);
  const classRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLInputElement>(null);

  const columnDefs: ColDef[] = [
    {
      headerName: "",
      width: 50,
      cellRenderer: (params: any) => (
        <button onClick={() => deleteSku(params.data.id)}>
          <FaTrash style={{ color: "black" }} />
        </button>
      ),
      autoHeight: false,
    },
    {
      headerName: "SKU",
      field: "label",
      width: 250,
      autoHeight: false,
    },
    {
      headerName: "Price",
      field: "price",
      width: 90,
    },
    {
      headerName: "Cost",
      field: "cost",
      width: 90,
    },
  ];

  if (!skus || skus.length === 0) {
    return (
      <div className="w-full h-screen bg-gray-300 p-2 ag-theme-alpine">
        <p>Loading or no SKUs found...</p>
      </div>
    );
  }

  const handleAddSku = () => {
    const label = labelRef.current?.value;
    const classValue = classRef.current?.value;
    const price = priceRef.current?.value
      ? parseFloat(priceRef.current.value)
      : 0;
    const cost = costRef.current?.value ? parseFloat(costRef.current.value) : 0;
    const department = departmentRef.current?.value;

    if (label && classValue && department && price > 0 && cost > 0) {
      const newSkuId = `SK${skus[skus.length - 1].id.split("k")[1] + 1}`;
      addSku(newSkuId, label, classValue, department, price, cost);
      handleCloseModal();
    }
  };

  return (
    <div className="w-full h-screen bg-gray-300 p-2 ag-theme-alpine">
      <div className="h-[calc(100vh-12rem)] w-full ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={skus || []}
          defaultColDef={{ resizable: true, sortable: true }}
          rowHeight={60}
          gridOptions={{
            suppressMenuHide: false,
            suppressDragLeaveHidesColumns: true,
            suppressAggFuncInHeader: true,
          }}
        />
      </div>
      <div className="p-5">
        <button
          className="h-10 w-auto p-2 bg-[#F28C76] rounded"
          onClick={openModal}
        >
          NEW STORE
        </button>
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">Add New Sku</h2>
        <input
          type="text"
          ref={labelRef}
          placeholder="Label"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          ref={classRef}
          placeholder="Class"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          ref={priceRef}
          placeholder="Price"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          ref={costRef}
          placeholder="Cost"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          ref={departmentRef}
          placeholder="Department"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleAddSku}
          className="px-4 py-2 bg-[#F28C76] hover:cursor-pointer text-black rounded"
        >
          Add Sku
        </button>
      </Modal>
    </div>
  );
};

export default SKU;
