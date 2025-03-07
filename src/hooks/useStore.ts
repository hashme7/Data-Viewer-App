import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addStore, deleteStore } from "../redux/slices/storeSlice";
import { StoreInput } from "../types/interfaces";


const useStore = () => {
  const rowData = useSelector((state: RootState) => state.stores);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddStore = useCallback((newStore: StoreInput) => {
    if (newStore.store && newStore.city && newStore.state) {
      dispatch(addStore({ id: rowData.length + 1, ...newStore }));
      handleCloseModal();
    }
  }, []);

  const deleteRow = useCallback(
    (id: number) => {
      dispatch(deleteStore(id));
    },
    [dispatch]
  );

  

  return {
    rowData,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleAddStore,
    deleteRow,
  };
};

export default useStore;
