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

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  AllCommunityModule,
  RowDragModule,
]);

const SKUPage: React.FC = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const skus: SKU[] = useSelector((state: RootState) => state.skus);
  const [selectedSkuId, setSelectedSkuId] = useState<string | null>(null);
  const handleDeleteClick = (id: string) => {
    setSelectedSkuId(id);
    setConfirmModalOpen(true);
  };
  const {
    openModal,
    modalOpen,
    addSku,
    editSku,
    handleCloseModal,
    columnDefs,
    deleteSku,
  } = useSku(handleDeleteClick);
  const [editingSku, setEditingSku] = useState<SKU | null>(null);
  const editDataRef = useRef<SKU | null>(null);

  const labelRef = useRef<HTMLInputElement>(null);
  const classRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLInputElement>(null);

  if (!skus || skus.length === 0) {
    return (
      <div className="w-full h-screen bg-gray-300 p-2 ag-theme-alpine">
        <p>Loading or no SKUs found...</p>
      </div>
    );
  }

  const handleEditClick = (sku: SKU): void => {
    setEditingSku(sku);
    openModal();
  };

  const handleSaveSku = () => {
    const updatedSku = {
      label: labelRef.current?.value || "",
      class: classRef.current?.value || "",
      price: Number(priceRef.current?.value) || 0,
      cost: Number(costRef.current?.value) || 0,
      department: costRef.current?.value || "",
    };

    if (
      updatedSku.label &&
      updatedSku.class &&
      updatedSku.department &&
      updatedSku.price > 0 &&
      updatedSku.cost > 0
    ) {
      if (editingSku?.id) {
        editSku({ ...updatedSku, id: editingSku.id });
      } else {
        const newSkuId = `SK${skus.length + 1}`;
        addSku({ ...updatedSku, id: newSkuId });
      }
      handleCloseModal();
      editDataRef.current = null;
    }
  };
  const handleConfirmDelete = (selectedStoreId: string) => {
    if (selectedStoreId !== null) {
      deleteSku(selectedStoreId);
    }
    setConfirmModalOpen(false);
  };

  return (
    <div className="w-full h-screen bg-gray-300 p-2 ag-theme-alpine">
      <div className="h-[calc(100vh-12rem)] w-full ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs(handleEditClick)}
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
          onClick={() => {
            editDataRef.current = null;
            openModal();
          }}
        >
          NEW SKU
        </button>
      </div>
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
          {editDataRef ? "Save Changes" : "Add SKU"}
        </button>
      </Modal>
      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => selectedSkuId && handleConfirmDelete(selectedSkuId)}
        title="Delete Sku"
        message={`Are you sure you want to delete (${selectedSkuId}) this Sku?`}
      />
    </div>
  );
};

export default SKUPage;
