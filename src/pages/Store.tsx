import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaTrash } from "react-icons/fa";
import {
  ColDef,
  ModuleRegistry,
  RowDragModule,
  AllCommunityModule,
} from "ag-grid-community";
import Modal from "../components/Modal";
import useStore from "../hooks/useStore";
import "../css/Table.css";

ModuleRegistry.registerModules([AllCommunityModule, RowDragModule]);

const StorePage: React.FC = () => {
  const {
    rowData,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleAddStore,
    deleteRow,
  } = useStore();

  const storeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);

  const AddStore = () => {
    const newStore = {
      store: storeRef.current?.value || "",
      city: cityRef.current?.value || "",
      state: stateRef.current?.value || "",
    };

    handleAddStore(newStore);
    handleCloseModal();
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "",
      field: "id",
      cellRenderer: (params: any) => (
        <button onClick={() => deleteRow(params.data.id)}>
          <FaTrash style={{ color: "black" }} />
        </button>
      ),
      width: 50,
    },
    {
      headerName: ":",
      width: 20,
      rowDrag: true,
      sortable: false,
      filter: false,
    },
    { headerName: "S.No", field: "id", width: 80 },
    { headerName: "Store", field: "store", flex: 1 },
    { headerName: "City", field: "city", flex: 1 },
    { headerName: "State", field: "state", width: 100 },
  ];

  return (
    <div className="w-full h-screen bg-gray-300 ag-theme-alpine">
      <div className="h-fit" style={{ height: "75vh", width: "100%" }}>
        <AgGridReact
          className="p-2 ag-theme-alpine"
          rowData={rowData}
          columnDefs={columnDefs}
          rowDragManaged={true}
          suppressMoveWhenRowDragging={true}
          defaultColDef={{ resizable: true, sortable: true }}
          rowHeight={50}
        />
      </div>
      <div className="p-5">
        <button
          className="h-10 w-auto p-2 bg-[#F28C76] rounded"
          onClick={handleOpenModal}
        >
          NEW STORE
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">Add New Store</h2>
        <input
          type="text"
          ref={storeRef}
          placeholder="Store Name"
          className="w-full p-2 mb-2 border rounded "
        />
        <input
          type="text"
          ref={cityRef}
          placeholder="City"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          ref={stateRef}
          placeholder="State"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={AddStore}
          className="px-4 py-2 bg-[#F28C76] hover:cursor-pointer text-black rounded"
        >
          Add Store
        </button>
      </Modal>
    </div>
  );
};

export default StorePage;
