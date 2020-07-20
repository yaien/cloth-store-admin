import { FindParams } from "chillhood/dist/session/invoices";
import axios from "axios";
import { Invoice } from "chillhood";

export function useInvoices() {
  async function find(params: FindParams) {
    const res = await axios.get<Invoice[]>("/api/invoices", { params });
    return res.data;
  }

  async function get(id: string) {
    const res = await axios.get<Invoice>("/api/invoices/" + id);
    return res.data;
  }

  async function setTransport(id: string, transport: Transport) {
    const res = await axios.patch<Invoice>(`/api/invoices/${id}/transport`);
    return res.data;
  }

  return {
    find,
    get,
    setTransport,
  };
}

export default useInvoices;
