import { FC } from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import { useForm } from "../hooks";
import { Size } from "chillhood";

export interface SizeFormProps {
  size?: Size;
  onSubmit?(size: Size): void;
}

export const SizeForm: FC<SizeFormProps> = (props) => {
  const form = useForm<Size>(props.size);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.onSubmit) {
      props.onSubmit(form.data);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className="mt-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Talla</InputGroupText>
        </InputGroupAddon>
        <Input
          name="label"
          placeholder="XS, S, M, L, XL"
          required
          onChange={form.input("label")}
          value={form.get("label")}
        />
      </InputGroup>
      <InputGroup className="my-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Existencia</InputGroupText>
        </InputGroupAddon>
        <Input
          type="number"
          name="quantity"
          min="0"
          placeholder="Existencia"
          required
          onChange={form.input("existence", Number)}
          value={form.get("existence")}
        />
      </InputGroup>
      <Button
        type="submit"
        size="sm"
        color="primary"
        className="m-auto d-block"
      >
        Guardar
      </Button>
    </Form>
  );
};
