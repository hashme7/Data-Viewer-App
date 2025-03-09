import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addStore, deleteStore, updateStore } from "../redux/slices/storeSlice";
import { Store, StoreInput } from "../types/interfaces";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ColDef } from "ag-grid-community";

/**
 * Custom hook to manage store-related operations, such as adding, updating, and deleting stores.
 * Also manages modal state and column definitions for the AG Grid table.
 *
 * @param handleDeleteClick - Callback function to handle the delete operation externally.
 */
const useStore = (handleDeleteClick: (id: number) => void) => {
  // Get store data from Redux state
  const rowData = useSelector((state: RootState) => state.stores);
  const dispatch = useDispatch();

  // Modal state to control opening and closing
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to open and close the modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  /**
   * Adds a new store to the Redux state.
   * Ensures that all required fields are present before dispatching the action.
   */
  const handleAddStore = useCallback(
    (newStore: StoreInput) => {
      if (newStore.name && newStore.city && newStore.state) {
        dispatch(
          addStore({
            id: rowData[rowData.length - 1]?.id + 1 || 1, // Generate a new ID
            ...newStore,
          })
        );
        handleCloseModal(); // Close the modal after adding
      }
    },
    [dispatch, rowData]
  );

  /**
   * Updates an existing store in the Redux state.
   * Calls the update action and closes the modal afterward.
   */
  const handleUpdateStore = useCallback(
    (updatedStore: Store) => {
      dispatch(updateStore(updatedStore));
      handleCloseModal();
    },
    [dispatch]
  );

  /**
   * Deletes a store from the Redux state.
   */
  const deleteRow = useCallback(
    (id: number) => {
      dispatch(deleteStore(id));
    },
    [dispatch]
  );

  /**
   * Column definitions for the AG Grid table.
   * Includes edit and delete buttons, as well as sortable and filterable fields.
   */
  const columnDefs = (handleEditClick: (store: any) => void): ColDef[] => [
    {
      headerName: "", // Empty header for delete button
      field: "id",
      cellRenderer: (params: any) => (
        <button onClick={() => handleDeleteClick(params.data.id)}>
          <FaTrash style={{ color: "black" }} />
        </button>
      ),
      width: 50,
    },
    {
      headerName: "Edit",
      field: "edit",
      cellRenderer: (params: any) => (
        <button onClick={() => handleEditClick(params.data)}>
          <FaEdit style={{ color: "black" }} />
        </button>
      ),
      width: 50,
    },
    {
      headerName: ":", // Column for row dragging
      width: 20,
      rowDrag: true,
      sortable: false,
      filter: false,
    },
    { headerName: "S.No", field: "id", width: 80 }, // Serial number column
    { headerName: "Store", field: "name", flex: 1 }, // Store name column
    { headerName: "City", field: "city", flex: 1 }, // City column
    { headerName: "State", field: "state", width: 100 }, // State column
  ];

  // Return all functions and state variables to be used in components
  return {
    rowData,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleAddStore,
    handleUpdateStore,
    deleteRow,
    columnDefs,
  };
};

export default useStore;
