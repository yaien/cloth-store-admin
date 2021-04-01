import axios from "axios";
import { Invoice, FindInvoiceOptions, Transport } from "chillhood";

export function useInvoices() {
  async function find(params: FindInvoiceOptions) {
    const res = await axios.get<Invoice[]>("/api/invoices", { params });
    return res.data;
  }

  async function get(id: string) {
    const res = await axios.get<Invoice>("/api/invoices/" + id);
    return res.data;
  }

  async function setTransport(id: string, transport: Transport) {
    const url = `/api/invoices/${id}/transport`;
    const res = await axios.patch<Invoice>(url, transport);
    return res.data;
  }

  return {
    find,
    get,
    setTransport,
  };
}

export default useInvoices;
