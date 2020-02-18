import { createContext, FC, useEffect } from "react";
import useSession from "../hooks/useSession";


export interface APIContext {
  session: ReturnType<typeof useSession>
}

export const APIContext = createContext<APIContext>(null as any)

export const API: FC = props => {
  const session = useSession()

  useEffect(() => {
    session.init()
  }, [])

  const value = {
    session
  }

  return (
    <APIContext.Provider value={value}>
      {props.children}
    </APIContext.Provider>
  )
}

export default API