import { FunctionComponent as FC } from "react"
import { Container } from "reactstrap"
import Navigation from "./nav"
import Auth from "./guards/auth"



export const Dash: FC = props => {
  return (
    <Auth>
      <Navigation></Navigation>
      <Container>
        {props.children}
      </Container>
    </Auth>
  )

}

export default Dash