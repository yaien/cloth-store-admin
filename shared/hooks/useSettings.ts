import { useState, useEffect } from "react"
import axios from "axios"
import { Cloudinary } from "../../lib/store"

export function useSettings() {
  const [cloudinary, setCloudinary] = useState<Cloudinary>()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    axios.get<Cloudinary>("/api/settings/cloudinary").then((res) => {
      setCloudinary(res.data)
      setReady(true)
    })
  }, [])

  return {
    cloudinary,
    ready,
  }
}
