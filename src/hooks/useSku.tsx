import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addSKU, deleteSKU, editSKU } from "../redux/slices/skuSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ColDef } from "ag-grid-community";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SKU } from "../types/interfaces";

export const useSku = (handleDeleteClick:(id:string)=>void) => {
  const rowData = useSelector((state: RootState) => state.skus);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<SKU | null>(null);

  const openModal = (sku?: SKU) => {
    if (sku) {
      setEditData(sku);
    } else {
      setEditData(null);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const addSku = (sku:SKU
  ) => {
    dispatch(
      addSKU(sku)
    );
    handleCloseModal();
  };

  const editSku = (sku: SKU) => {
    dispatch(editSKU(sku));
    handleCloseModal();
  };

  const deleteSku = useCallback(
    (id: string) => {
      dispatch(deleteSKU(id));
    },
    [dispatch]
  );

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

