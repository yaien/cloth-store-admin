import { FC, useState } from "react";
import Dash from "../../shared/components/dash";
import Head from "../../shared/components/head";
import {
  Container,
  Card,
  Form,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button
} from "reactstrap";
import { Item, Size } from "../../lib/store";

import ItemForm from "../../shared/components/item-form";
import ItemSizes from "../../shared/components/item-sizes";

const Create: FC = () => {
  const [item, setItem] = useState<Item>();

  const onChange = (change: Item) => setItem({ ...item, ...change });

  const onChangeSizes = (sizes: Size[]) => setItem({ ...item, sizes });

  return (
    <Dash>
      <Head title="Create Item" />
      <Container className="mt-3">
        <Card>
          <CardHeader>Agregar Item</CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md={6}>
                  <ItemForm item={item} onChange={onChange} />
                </Col>
                <Col md={6}>
                  <ItemSizes sizes={item?.sizes} onChange={onChangeSizes} />
                </Col>
              </Row>
              <Button type="submit" color="primary" block className="mt-3">
                Agregar
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </Dash>
  );
};

export default Create;
