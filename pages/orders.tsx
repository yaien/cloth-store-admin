import { FunctionComponent as FC, useState, useEffect } from "react"
import { useAPI } from "../shared/hooks";
import Dash from "../shared/components/dash";
import Head from "../shared/components/head";


const Orders = () => {
  const api = useAPI()
  const [invoices, setInvoices] = useState();
  const [loading, setLoading] = useState();
  
  return (
    <Dash>
      <Head title="Orders" />
      orders
    </Dash>
  );
}

export default Orders