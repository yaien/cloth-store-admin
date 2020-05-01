import { createContext, FC, useEffect } from "react"
import useSession from "../hooks/useSession"
import useItems from "../hooks/useItems"
import { useSettings } from "../hooks/useSettings"

export interface APIContext {
  session: ReturnType<typeof useSession>
  items: ReturnType<typeof useItems>
  settings: ReturnType<typeof useSettings>
}

export const APIContext = createContext<APIContext>(null as any)

export const API: FC = (props) => {
  const session = useSession()
  const items = useItems()
  const settings = useSettings()

  useEffect(() => {
    session.init()
  }, [])

  const value = {
    session,
    items,
    settings,
  }

  return (
    <APIContext.Provider value={value}>{props.children}</APIContext.Provider>
  )
}

export default API
