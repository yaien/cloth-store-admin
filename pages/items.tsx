import { FunctionComponent as FC, useState, useEffect } from "react"
import { useAPI } from "../shared/hooks";
import Dash from "../shared/components/dash";
import Head from "../shared/components/head";


const Items = () => {
  const api = useAPI()
  const [items, setItems] = useState();
  const [loading, setLoading] = useState();
  
  return (
    <Dash>
      <Head title="Items" />
      items
    </Dash>
  );
}

export default Items