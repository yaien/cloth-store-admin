import Head from "../../shared/components/head"
import { FunctionComponent as FC, FormEvent } from "react"
import { Container, Card, CardHeader, CardBody, Form, InputGroup, InputGroupText, Input, InputGroupAddon, Button } from "reactstrap"
import { useForm, useAPI } from "../../shared/hooks"
import { Credentials } from "../../lib/store"
import { useRouter } from "next/router"

const Login: FC = () => {
  const api = useAPI()
  const router = useRouter()
  const form = useForm<Credentials>()

  function next(): string {
    let value = router.query.next
    if(!value) return ""
    if (typeof value == "string") return value
    return value[0] 
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await api.session.login(form.data)
    await router.push(next() || "/")
  }

  return (
    <Container fluid="md">
      <Head title="Inicio de sesión"/>
      <Card className="mt-5">
        <CardHeader>
          Inicio de sesión
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <InputGroup className="mt-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-envelope"/>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="email" name="email" placeholder="Correo" required onChange={form.input("email")} />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-key"/>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="password" name="password" placeholder="Contraseña" required onChange={form.input("password")}/>
            </InputGroup>
            <Button className="d-block m-auto" type="submit" color="primary">
              Iniciar Sesión
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  )
}

export default Login