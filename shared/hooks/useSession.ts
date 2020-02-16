import axios from "axios"
import { Credentials, User } from "../../lib/store"
import { useState } from "react"


export function useSession() {
  const [user, setUser] = useState<User>()
  const [ready, setReady] = useState(false)

  const login = async (credentials: Credentials) => {
    let res = await axios.post("/api/auth/login", credentials)
    setUser(res.data)
  }

  const logout = async () => {
    await axios.post("/api/auth/logout")
    setUser(undefined)
  }

  const init = async () => {
    try {
      let res = await axios.get("/api/user")
      setUser(res.data)
    } catch {
      await logout()
    } finally {
      setReady(true)
    }
  }

  return {
    login,
    logout,
    init,
    user,
    ready
  }
}

export default useSession