import { FunctionComponent as FC } from "react"
import { AppProps } from "next/app"
import API from "../shared/components/api"

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <API>
    <Component {...pageProps} />
  </API>
)



export default App