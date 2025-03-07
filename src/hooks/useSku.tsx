import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addSKU, deleteSKU } from "../redux/slices/skuSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ColDef } from "ag-grid-community";
import { FaTrash } from "react-icons/fa";

export const useSku = () => {
  const rowData = useSelector((state: RootState) => state.skus);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const deleteSku = useCallback(
    (id: string) => {
      dispatch(deleteSKU(id));
    },
    [dispatch]
  );
  const addSku = (
    id: string,
    label: string,
    classValue: string,
    department: string,
    price: number,
    cost: number
  ) => {
    dispatch(
      addSKU({
        id,
        label,
        class: classValue,
        department,
        price,
        cost,
      })
    );
    handleCloseModal();
  };
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

  return {
    addSku,
    deleteSku,
    openModal,
    modalOpen,
    rowData,
    handleCloseModal,
    columnDefs,
  };
};
