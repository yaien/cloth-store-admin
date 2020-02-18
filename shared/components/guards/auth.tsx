import { FC, useEffect } from "react"
import { useRouter } from "next/router"
import Loader from "../loader"
import { useAPI } from "../../hooks"


export const Auth: FC = props => {
  const api = useAPI()
  const router = useRouter()

  useEffect(() => {
    if(api.session.ready && !api.session.user) {
      router.push({ 
        pathname: "/auth/login", 
        query: { 
          next: router.pathname 
        }
      })
    }
  }, [api.session.ready, api.session.user])


  if(!api.session.ready) {
    return <Loader />
  }

  if(api.session.user) {
    return <>{props.children}</> 
  }

  return <Loader/>
}

export default Auth