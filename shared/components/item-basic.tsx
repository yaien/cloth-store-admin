import React, { FC, useEffect } from "react";
import {
  CardBody,
  Card,
  Input,
  FormGroup,
  Label,
  CardHeader,
} from "reactstrap";
import { useForm } from "../hooks";
import { Item } from "chillhood";

export interface ItemBasicFormProps {
  item?: Item;
  onChange?(item: Item): void;
}

export const ItemBasicForm: FC<ItemBasicFormProps> = (props) => {
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
          <Input
            name="name"
            required
            onChange={form.input("name")}
            value={form.get("name") as string}
          />
        </FormGroup>
        <FormGroup>
          <Label>Precio</Label>
          <Input
            type="number"
            name="price"
            min="0"
            required
            onChange={form.input("price", Number)}
            value={form.get("price") as number}
          />
        </FormGroup>
        <FormGroup>
          <Label>Descripción</Label>
          <Input
            type="textarea"
            name="description"
            onChange={form.input("description")}
            value={form.get("description") as string}
          />
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default ItemBasicForm;
