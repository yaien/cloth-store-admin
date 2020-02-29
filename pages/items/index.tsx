import { FC, useState, useEffect } from "react"
import { useAPI, useToggler } from "../../shared/hooks";
import { Container, Card, CardHeader, Button, CardBody, Row, Col } from "reactstrap";
import Dash from "../../shared/components/dash";
import Head from "../../shared/components/head";
import ItemCard from "../../shared/components/item-card";
import Link from "next/link"


const Items: FC = () => {
  const api = useAPI()
  const addModal = useToggler()
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true)
    api.items.fetch().then(() => setLoading(false))
  }, [])
  
  return (
    <Dash>
      <Head title="Items" />
      <Container className="mt-3">
        <Card>
          <CardHeader className="d-flex justify-content-between">
            Items
            <Link href="/items/create">
              <Button size="sm" color="primary">
                Agregar
              </Button>
            </Link>
          </CardHeader>
          <CardBody>
            <Row>
              { api.items.data.map(item => (
                <Col md={4} key={item.slug}>
                  <ItemCard item={item}></ItemCard>
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>
      </Container>
    </Dash>
  );
}

export default Items