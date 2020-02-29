import { useState } from "react"
import { Item } from "../../lib/store"
import axios from "axios"


function useItems() {
  const [data, setData] = useState<Item[]>([])

  const fetch = async () => {
    let res = await axios.get('/api/items')
    setData(res.data)
  }

  const create = async (item: Partial<Item>) => {
    let res = await axios.post("/api/items", item)
    return res.data
  }

  const update = async (id: string, item: Partial<Item>) => {
    let res = await axios.put("/api/items/" + id, item)
    return res.data
  }

  return {
    data,
    fetch,
    create,
    update
  }
}

export default useItems