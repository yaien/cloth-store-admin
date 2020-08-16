import Head from "../../shared/components/head";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAPI } from "../../shared/hooks";
import { Item } from "chillhood";
import { withDash } from "../../shared/components/dash";
import { Container, Card, CardHeader, CardBody, Button } from "reactstrap";
import { ItemForm } from "../../shared/components/item-form";
import PublishButton from "../../shared/components/publish-button";

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

  const onSubmit = async (item: Item) => {
    await api.items.update(item.id, item);
    router.push("/items");
  };

  const onChange = async (changedItem: Item) => {
    await api.items.update(item.id, changedItem);
  };

  const publish = async () => {
    const update = { ...item, active: true } as Item;
    const updated = await api.items.update(item.id, update);
    setItem(updated);
  };

  const unpublish = async () => {
    const update = { ...item, active: false } as Item;
    const updated = await api.items.update(item.id, update);
    setItem(updated);
  };

  if (!item) {
    return null;
  }

  return (
    <>
      <Head title={item.name} />
      <Container className="mt-5">
        <Card>
          <CardHeader className="d-flex justify-content-between">
            Actualizar Item
            <PublishButton
              item={item}
              onUnpublish={unpublish}
              onPublish={publish}
            />
          </CardHeader>
          <CardBody>
            <ItemForm
              item={item}
              onSubmit={onSubmit}
              onChange={onChange}
            ></ItemForm>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default withDash(Detail);
