import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addStore, deleteStore } from "../redux/slices/storeSlice";

interface StoreInput {
  store: string;
  city: string;
  state: string;
}

const useStore = () => {
  const rowData = useSelector((state: RootState) => state.stores);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStore, setNewStore] = useState<StoreInput>({
    store: "",
    city: "",
    state: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewStore({ store: "", city: "", state: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStore({ ...newStore, [e.target.name]: e.target.value });
  };

  const handleAddStore = () => {
    if (newStore.store && newStore.city && newStore.state) {
      dispatch(addStore({ id: rowData.length + 1, ...newStore }));
      handleCloseModal();
    }
  };

  const deleteRow = useCallback(
    (id: number) => {
      dispatch(deleteStore(id));
    },
    [dispatch]
  );

  return {
    rowData,
    isModalOpen,
    newStore,
    handleOpenModal,
    handleCloseModal,
    handleChange,
    handleAddStore,
    deleteRow,
  };
};

export default useStore;
