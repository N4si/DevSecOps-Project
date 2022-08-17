import { useContext } from "react";
import { DetailModalContext } from "contexts/DetailModalContext";

const useDetailModal = () => useContext(DetailModalContext);

export default useDetailModal;
