import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addStore, deleteStore } from "../redux/slices/storeSlice";
import { StoreInput } from "../types/interfaces";
import { FaTrash } from "react-icons/fa";
import { ColDef } from "ag-grid-community";

const useStore = (handleDeleteClick: (id: number) => void) => {
  const rowData = useSelector((state: RootState) => state.stores);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddStore = useCallback((newStore: StoreInput) => {
    if (newStore.name && newStore.city && newStore.state) {
      dispatch(
        addStore({
          id: rowData.length + 1,
          code: `ST +${rowData[rowData.length - 1].code.split("T")[1] + 1}`,
          ...newStore,
        })
      );
      handleCloseModal();
    }
  }, []);

  const deleteRow = useCallback(
    (id: number) => {
      dispatch(deleteStore(id));
    },
    [dispatch]
  );

  const columnDefs: ColDef[] = [
    {
      headerName: "",
      field: "id",
      cellRenderer: (params: any) => (
        <button onClick={() => handleDeleteClick(params.data.id)}>
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
    { headerName: "Store", field: "name", flex: 1 },
    { headerName: "City", field: "city", flex: 1 },
    { headerName: "State", field: "state", width: 100 },
  ];

  return {
    rowData,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleAddStore,
    deleteRow,
    columnDefs,
  };
};

export default useStore;
