import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  RowDragModule,
} from "ag-grid-community";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../css/Table.css";
import { useSku } from "../hooks/useSku";
import Modal from "../components/Modal";
import { SKU } from "../types/interfaces";
import ConfirmationModal from "../components/confirmationModal";

// Register AG Grid modules required for functionality
ModuleRegistry.registerModules([
  ClientSideRowModelModule, // Handles client-side row data management
  AllCommunityModule, // Includes all AG Grid community features
  RowDragModule, // Enables row dragging functionality
]);

/**
 * SKUPage Component
 * This component manages and displays SKU (Stock Keeping Unit) data in a table using AG Grid.
 * Users can add, edit, and delete SKUs with modal-based forms and confirmation dialogs.
 */
const SKUPage: React.FC = () => {
  // State to control the delete confirmation modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Fetch SKUs from Redux store
  const skus: SKU[] = useSelector((state: RootState) => state.skus);

  // Store the selected SKU ID for deletion confirmation
  const [selectedSkuId, setSelectedSkuId] = useState<string | null>(null);

  // Function to handle delete button click, setting the SKU ID and opening the confirmation modal
  const handleDeleteClick = (id: string) => {
    setSelectedSkuId(id);
    setConfirmModalOpen(true);
  };

  // Custom hook for SKU management
  const {
    openModal,
    modalOpen,
    addSku,
    editSku,
    handleCloseModal,
    columnDefs,
    deleteSku,
  } = useSku(handleDeleteClick);

  // State to track the SKU being edited
  const [editingSku, setEditingSku] = useState<SKU | null>(null);

  // Ref to temporarily store SKU data while editing
  const editDataRef = useRef<SKU | null>(null);

  // Refs for input fields in the modal form
  const labelRef = useRef<HTMLInputElement>(null);
  const classRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLInputElement>(null);

  // Show a loading message if SKUs are not available
  if (!skus || skus.length === 0) {
    return (
      <div className="w-full h-screen bg-gray-300 p-2 ag-theme-alpine">
        <p>Loading or no SKUs found...</p>
      </div>
    );
  }

  /**
   * Handles edit button click for a specific SKU.
   * Opens the modal and sets the selected SKU for editing.
   */
  const handleEditClick = (sku: SKU): void => {
    setEditingSku(sku);
    openModal();
  };

  /**
   * Handles saving a new SKU or updating an existing one.
   * Collects data from input fields and calls addSku or editSku accordingly.
   */
  const handleSaveSku = () => {
    const updatedSku = {
      label: labelRef.current?.value || "",
      class: classRef.current?.value || "",
      price: Number(priceRef.current?.value) || 0,
      cost: Number(costRef.current?.value) || 0,
      department: departmentRef.current?.value || "",
    };

    // Ensure all required fields are filled before saving
    if (
      updatedSku.label &&
      updatedSku.class &&
      updatedSku.department &&
      updatedSku.price > 0 &&
      updatedSku.cost > 0
    ) {
      if (editingSku?.id) {
        // If editing an existing SKU, update it
        editSku({ ...updatedSku, id: editingSku.id });
      } else {
        // Otherwise, create a new SKU with a unique ID
        const newSkuId = `SK${skus.length + 1}`;
        addSku({ ...updatedSku, id: newSkuId });
      }
      handleCloseModal();
      editDataRef.current = null;
    }
  };

  /**
   * Handles SKU deletion after confirmation.
   */
  const handleConfirmDelete = (selectedStoreId: string) => {
    if (selectedStoreId !== null) {
      deleteSku(selectedStoreId);
    }
    setConfirmModalOpen(false);
  };

  return (
    <div className="w-full h-screen bg-gray-300 p-2 ag-theme-alpine">
      {/* AG Grid Table */}
      <div className="h-[calc(100vh-12rem)] w-full ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs(handleEditClick)} // Column definitions with edit functionality
          rowData={skus || []} // SKU data for the table
          defaultColDef={{ resizable: true, sortable: true }} // Default column properties
          rowHeight={60} // Set row height for better visibility
          gridOptions={{
            suppressMenuHide: false, // Show menu options for columns
            suppressDragLeaveHidesColumns: true, // Prevent columns from being hidden when dragged
            suppressAggFuncInHeader: true, // Hide aggregation functions in headers
          }}
        />
      </div>

      {/* Button to add a new SKU */}
      <div className="p-5">
        <button
          className="h-10 w-auto p-2 bg-[#F28C76] rounded"
          onClick={() => {
            editDataRef.current = null;
            openModal();
          }}
        >
          NEW SKU
        </button>
      </div>

      {/* SKU Modal for Adding/Editing */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">
          {editingSku ? "Edit SKU" : "Add New SKU"}
        </h2>
        <input
          type="text"
          ref={labelRef}
          placeholder="Label"
          defaultValue={editingSku?.label || ""}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          ref={classRef}
          placeholder="Class"
          defaultValue={editingSku?.class || ""}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          ref={priceRef}
          placeholder="Price"
          defaultValue={editingSku?.price?.toString() || ""}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          ref={costRef}
          placeholder="Cost"
          defaultValue={editingSku?.cost?.toString() || ""}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          ref={departmentRef}
          placeholder="Department"
          defaultValue={editingSku?.department || ""}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleSaveSku}
          className="px-4 py-2 bg-[#F28C76] hover:cursor-pointer text-black rounded"
        >
          {editingSku ? "Save Changes" : "Add SKU"}
        </button>
      </Modal>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => selectedSkuId && handleConfirmDelete(selectedSkuId)}
        title="Delete SKU"
        message={`Are you sure you want to delete (${selectedSkuId}) this SKU?`}
      />
    </div>
  );
};

export default SKUPage;
