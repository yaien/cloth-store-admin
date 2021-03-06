import { FC, useState, useEffect } from "react";
import { useAPI } from "../../shared/hooks";
import {
  Container,
  Card,
  CardHeader,
  Button,
  CardBody,
  CardDeck,
  Col,
  Row,
} from "reactstrap";
import Dash from "../../shared/components/dash";
import Head from "../../shared/components/head";
import ItemCard from "../../shared/components/item-card";
import Link from "next/link";
import Loader from "../../shared/components/loader";

const Items: FC = () => {
  const api = useAPI();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.items.fetch().then(() => setLoading(false));
  }, []);

  return (
    <Dash>
      <Head title="Items" />
      <Container className="mt-3" fluid>
        <Row>
          <Col xl={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                Items
                <Link href="/items/create">
                  <Button size="sm" color="primary">
                    Agregar
                  </Button>
                </Link>
              </CardHeader>
              <CardBody className="p-0">
                {loading && <Loader />}
                <CardDeck className="flex-wrap">
                  {api.items.data.map((item) => (
                    <Col key={item.id} md={6} lg={4} xl={3} className="mt-3">
                      <ItemCard item={item}></ItemCard>
                    </Col>
                  ))}
                </CardDeck>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Dash>
  );
};

export default Items;
