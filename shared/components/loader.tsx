import { FC } from "react";
import { Container, Spinner } from "reactstrap";


export const Loader: FC = () => {
  return (
    <Container className="mt-5">
      <Spinner color="dark" style={{ width: '3rem', height: '3rem' }} type="grow" className="d-block m-auto" />
    </Container>
  )
}

export default Loader