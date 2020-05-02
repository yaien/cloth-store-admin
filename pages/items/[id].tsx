import Head from "../../shared/components/head";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAPI } from "../../shared/hooks";
import { Item } from "../../lib/store";
import { withDash } from "../../shared/components/dash";
import { Container, Card, CardHeader, CardBody } from "reactstrap";
import { ItemForm } from "../../shared/components/item-form";

const Detail: FC = () => {
  const router = useRouter();
  const api = useAPI();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const id = router.query.id as string;
    if (!id) return;
    api.items.get(id).then((data) => setItem(data));
    // .catch(() => router.replace("/"));
  }, [router.query]);

  const update = async (item: Item) => {
    await api.items.update(item.id, item);
  };

  const onSubmit = async (item: Item) => {
    await update(item);
  };

  if (!item) {
    return null;
  }

  return (
    <>
      <Head title={item.name} />
      <Container className="mt-5">
        <Card>
          <CardHeader>Actualizar Item</CardHeader>
          <CardBody>
            <ItemForm item={item} onSubmit={onSubmit}></ItemForm>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default withDash(Detail);
