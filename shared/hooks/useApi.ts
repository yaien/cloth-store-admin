import { useContext } from "react";
import { APIContext } from "../components/api";

export const useAPI = () => useContext(APIContext)

export default useAPI