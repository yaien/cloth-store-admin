import { createContext, FC, useEffect } from "react";
import useSession from "../hooks/useSession";
import useItems from "../hooks/useItems";


export interface APIContext {
  session: ReturnType<typeof useSession>
  items: ReturnType<typeof useItems>
}

export const APIContext = createContext<APIContext>(null as any)

export const API: FC = props => {
  const session = useSession()
  const items = useItems()

  useEffect(() => {
    session.init()
  }, [])

  const value = {
    session,
    items
  }

  return (
    <APIContext.Provider value={value}>
      {props.children}
    </APIContext.Provider>
  )
}

export default API