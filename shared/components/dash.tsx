import { FunctionComponent as FC, ComponentType } from "react";
import { Container } from "reactstrap";
import Navigation from "./nav";
import Auth from "./guards/auth";

export const Dash: FC = (props) => {
  return (
    <Auth>
      <Navigation></Navigation>
      <Container>{props.children}</Container>
    </Auth>
  );
};

export const withDash = (Component: ComponentType): FC => {
  return (props) => (
    <Dash>
      <Component {...props}></Component>
    </Dash>
  );
};

export default Dash;
