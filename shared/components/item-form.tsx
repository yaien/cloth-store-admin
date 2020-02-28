import React, { FC, useEffect } from "react";
import {
  CardBody,
  Card,
  Input,
  FormGroup,
  Label,
  CardHeader
} from "reactstrap";
import { useForm } from "../hooks";
import { Item } from "../../lib/store";

export interface ItemFormProps {
  item?: Item;
  onChange?(item: Item): void;
}

export const ItemForm: FC<ItemFormProps> = props => {
  const form = useForm<Item>(props.item);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(form.data);
    }
  }, [form.data]);

  return (
    <Card>
      <CardHeader>Información Basica</CardHeader>
      <CardBody>
        <FormGroup>
          <Label>Nombre</Label>
          <Input name="name" required onChange={form.input("name")} />
        </FormGroup>
        <FormGroup>
          <Label>Precio</Label>
          <Input
            type="number"
            name="price"
            required
            onChange={form.input("price", Number)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Descripción</Label>
          <Input
            type="textarea"
            name="description"
            required
            onChange={form.input("description")}
          />
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default ItemForm;
