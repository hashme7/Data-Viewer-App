import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSKU, deleteSKU, editSKU } from "../redux/slices/skuSlice";
import { RootState } from "../redux/store";
import { ColDef } from "ag-grid-community";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SKU } from "../types/interfaces";

/**
 * Custom hook to manage SKU operations (add, edit, delete) and define table columns for AG Grid.
 *
 * @param handleDeleteClick - A callback function to handle delete actions for SKUs.
 * @returns An object containing functions and states related to SKU management.
 */
export const useSku = (handleDeleteClick: (id: string) => void) => {
  // Select SKU data from Redux store
  const rowData = useSelector((state: RootState) => state.skus);
  const dispatch = useDispatch();

  // State to manage modal visibility
  const [modalOpen, setModalOpen] = useState(false);

  // State to store the SKU being edited
  const [editData, setEditData] = useState<SKU | null>(null);

  /**
   * Opens the modal for adding or editing an SKU.
   * If an SKU is passed, it sets it for editing; otherwise, opens for adding a new SKU.
   *
   * @param sku - Optional SKU object to be edited.
   */
  const openModal = (sku?: SKU) => {
    if (sku) {
      setEditData(sku);
    } else {
      setEditData(null);
    }
    setModalOpen(true);
  };

  /**
   * Closes the modal and resets edit data.
   */
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  /**
   * Dispatches an action to add a new SKU and closes the modal.
   *
   * @param sku - The SKU object to be added.
   */
  const addSku = (sku: SKU) => {
    dispatch(addSKU(sku));
    handleCloseModal();
  };

  /**
   * Dispatches an action to update an existing SKU and closes the modal.
   *
   * @param sku - The SKU object to be edited.
   */
  const editSku = (sku: SKU) => {
    dispatch(editSKU(sku));
    handleCloseModal();
  };

  /**
   * Dispatches an action to delete an SKU based on its ID.
   *
   * @param id - The ID of the SKU to be deleted.
   */
  const deleteSku = useCallback(
    (id: string) => {
      dispatch(deleteSKU(id));
    },
    [dispatch]
  );

  /**
   * Defines column configurations for AG Grid.
   * Includes action buttons for editing and deleting SKUs.
   *
   * @param handleEditClick - A function that handles SKU editing.
   * @returns An array of column definitions for the AG Grid.
   */
  const columnDefs = (handleEditClick: (sku: SKU) => void): ColDef[] => [
    {
      headerName: "",
      width: 50,
      cellRenderer: (params: any) => (
        <button onClick={() => handleDeleteClick(params.data.id)}>
          <FaTrash style={{ color: "black" }} />
        </button>
      ),
    },
    {
      headerName: "Edit",
      width: 80,
      cellRenderer: (params: any) => (
        <button onClick={() => handleEditClick(params.data)}>
          <FaEdit style={{ color: "black" }} />
        </button>
      ),
    },
    {
      headerName: "SKU",
      field: "label",
      width: 250,
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

  return {
    addSku,
    editSku,
    deleteSku,
    openModal,
    modalOpen,
    rowData,
    handleCloseModal,
    editData,
    columnDefs,
  };
};
