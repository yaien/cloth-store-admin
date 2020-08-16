import { Item, Size, Picture } from "chillhood";
import { FC, FormEvent, useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  CardBody,
  CardFooter,
  Card,
  CardHeader,
} from "reactstrap";
import ItemSizes from "./item-sizes";
import ImageInput from "./image-input";
import ImageList from "./image-list";
import ItemBasic from "./item-basic";
import ItemImages from "./item-images";

export interface ItemFormProps {
  item?: Item;
  onSubmit?(item: Item): void;
  onChange?(item: Item): void;
}

export const ItemForm: FC<ItemFormProps> = (props) => {
  const [item, setItem] = useState<Item>(props.item || ({} as Item));

  const onChange = (change: Item) => setItem({ ...item, ...change });

  const onChangeSizes = (sizes: Size[]) => setItem({ ...item, sizes });

  const onPictureAdded = (picture: Picture) => {
    setItem((item) => {
      const pictures = item.pictures ? [...item.pictures, picture] : [picture];
      return { ...item, pictures };
    });
  };

  const onPositionChange = (pictures: Picture[]) => {
    setItem({ ...item, pictures });
  };

  const onRemove = (picture: Picture) => {
    const pictures = item.pictures.filter(
      (p) => p.reference != picture.reference
    );
    setItem({ ...item, pictures });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.onSubmit) {
      props.onSubmit(item);
    }
  };

  useEffect(() => {
    if (props.onChange) {
      props.onChange(item);
    }
  }, [item]);

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col md={6}>
          <ItemBasic item={item} onChange={onChange} />
        </Col>
        <Col md={6}>
          <ItemSizes sizes={item?.sizes} onChange={onChangeSizes} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={12}>
          <ItemImages
            pictures={item.pictures}
            onAdded={onPictureAdded}
            onPositionChange={onPositionChange}
            onRemove={onRemove}
          />
        </Col>
      </Row>

      <Button type="submit" color="primary" block className="mt-3">
        Guardar
      </Button>
    </Form>
  );
};
