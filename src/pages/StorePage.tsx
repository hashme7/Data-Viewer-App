import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaTrash } from "react-icons/fa";
import { ColDef, ModuleRegistry, RowDragModule } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import Modal from "../components/Modal";
import useStore from "../hooks/useStore";
import "../css/storeTable.css";

ModuleRegistry.registerModules([ClientSideRowModelModule, RowDragModule]);

const StorePage: React.FC = () => {
  const {
    rowData,
    isModalOpen,
    newStore,
    handleOpenModal,
    handleCloseModal,
    handleChange,
    handleAddStore,
    deleteRow,
  } = useStore();

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
    <div className="w-full h-screen bg-gray-300">
      <div
        className="ag-theme-alpine store-table-container h-fit"
        style={{ height: "75vh", width: "100%" }}
      >
        <AgGridReact
          className="p-2"
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
          name="store"
          placeholder="Store Name"
          value={newStore.store}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newStore.city}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={newStore.state}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleAddStore}
          className="px-4 py-2 bg-[#F28C76] hover:cursor-pointer text-black rounded"
        >
          Add Store
        </button>
      </Modal>
    </div>
  );
};

export default StorePage;
