import Head from "../../shared/components/head";
import { withDash } from "../../shared/components/dash";
import { FC } from "react";
import { useAPI } from "../../shared/hooks";
import { useRouter } from "next/router";
import { Item } from "chillhood";
import { ItemForm } from "../../shared/components/item-form";
import { Container, Card, CardBody, CardHeader } from "reactstrap";

const Create: FC = () => {
  const api = useAPI();
  const router = useRouter();

  const onSubmit = async (item: Item) => {
    try {
      await api.items.create(item);
      await router.push("/items");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Head title="Create Item" />
      <Container className="mt-3">
        <Card>
          <CardHeader>Agregar Item</CardHeader>
          <CardBody>
            <ItemForm onSubmit={onSubmit} />
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default withDash(Create);
