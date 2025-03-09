import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  RowDragModule,
} from "ag-grid-community";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/confirmationModal";
import useStore from "../hooks/useStore";
import "../css/Table.css";
import { StoreInput } from "../types/interfaces";

// Register Ag-Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  AllCommunityModule,
  RowDragModule,
]);

const StorePage: React.FC = () => {
  // State for confirmation modal and store editing
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [editingStore, setEditingStore] = useState<StoreInput | null>(null);

  // Store input references
  const storeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  // Custom hook for store-related operations
  const {
    rowData,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleAddStore,
    handleUpdateStore,
    deleteRow,
    columnDefs,
  } = useStore(handleDeleteClick);

  // Handles edit button click and opens the modal
  const handleEditClick = (store: StoreInput) => {
    setEditingStore(store);
    handleOpenModal();
  };

  // Handles delete button click and opens confirmation modal
  function handleDeleteClick(id: number) {
    setSelectedStoreId(id);
    setConfirmModalOpen(true);
  };

  // Confirms and proceeds with store deletion
  const handleConfirmDelete = () => {
    if (selectedStoreId !== null) {
      deleteRow(selectedStoreId);
    }
    setConfirmModalOpen(false);
  };

  // Handles adding or updating a store
  const handleSaveStore = () => {
    const updatedStore: StoreInput = {
      name: storeRef.current?.value || "",
      city: cityRef.current?.value || "",
      state: stateRef.current?.value || "",
      code: codeRef.current?.value || "",
    };

    if (editingStore && editingStore.id) {
      handleUpdateStore({ ...updatedStore, id: editingStore.id });
    } else {
      handleAddStore(updatedStore);
    }

    setEditingStore(null);
    handleCloseModal();
  };

  return (
    <div className="w-full h-screen bg-gray-300">
      {/* Ag-Grid Table */}
      <div
        className="h-fit ag-theme-alpine"
        style={{ height: "75vh", width: "100%" }}
      >
        <AgGridReact
          className="p-2 ag-theme-alpine"
          rowData={rowData}
          columnDefs={columnDefs(handleEditClick)}
          rowDragManaged
          suppressMoveWhenRowDragging
          defaultColDef={{ resizable: true, sortable: true }}
          rowHeight={50}
        />
      </div>

      {/* Add New Store Button */}
      <div className="p-5">
        <button
          className="h-10 w-auto p-2 bg-[#F28C76] rounded"
          onClick={handleOpenModal}
        >
          NEW STORE
        </button>
      </div>

      {/* Store Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">
          {editingStore ? "Edit Store" : "Add New Store"}
        </h2>
        <input
          type="text"
          ref={storeRef}
          defaultValue={editingStore?.name || ""}
          placeholder="Store Name"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          ref={cityRef}
          defaultValue={editingStore?.city || ""}
          placeholder="City"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          ref={stateRef}
          defaultValue={editingStore?.state || ""}
          placeholder="State"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          ref={codeRef}
          defaultValue={editingStore?.code || ""}
          placeholder="Code"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleSaveStore}
          className="px-4 py-2 bg-[#F28C76] hover:cursor-pointer text-black rounded"
        >
          {editingStore ? "Update Store" : "Add Store"}
        </button>
      </Modal>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Store"
        message="Are you sure you want to delete this store?"
      />
    </div>
  );
};

export default StorePage;
