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
          name="existence"
          min="0"
          placeholder="Existencia"
          required
          onChange={form.input("existence", Number)}
          value={form.get("existence")}
        />
      </InputGroup>
      <InputGroup className="my-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Largo(cm)</InputGroupText>
        </InputGroupAddon>
        <Input
          type="number"
          name="body"
          min="0"
          placeholder="Largo"
          required
          onChange={form.input("body", Number)}
          value={form.get("body")}
        />
      </InputGroup>
      <InputGroup className="my-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Ancho(cm)</InputGroupText>
        </InputGroupAddon>
        <Input
          type="number"
          name="chest"
          min="0"
          placeholder="Ancho"
          required
          onChange={form.input("chest", Number)}
          value={form.get("chest")}
        />
      </InputGroup>
      <InputGroup className="my-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Mangas(cm)</InputGroupText>
        </InputGroupAddon>
        <Input
          type="number"
          name="sleeve"
          min="0"
          placeholder="Mangas"
          required
          onChange={form.input("sleeve", Number)}
          value={form.get("sleeve")}
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
