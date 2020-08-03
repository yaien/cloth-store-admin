import { FC, FormEvent } from "react";
import { Transport } from "chillhood";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import { useForm } from "../hooks";

export interface TransportFormProps {
  transport?: Transport;
  onSubmit?(transport: Transport): void;
}

export const TransportForm: FC<TransportFormProps> = (props) => {
  const form = useForm(props.transport);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(form.data);
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Provedor</Label>
        <Input
          name="provider"
          required
          onChange={form.input("provider", (v: string) => v.toUpperCase())}
          value={form.get("provider")}
          placeholder="Ej: SERVIENTREGA, COORDINADORA, etc"
        />
      </FormGroup>
      <FormGroup>
        <Label>Numero de guia</Label>
        <Input
          name="guide"
          required
          onChange={form.input("guide")}
          value={form.get("guide")}
        />
      </FormGroup>
      <Button color="primary" type="submit" block>
        ACTUALIZAR
      </Button>
    </Form>
  );
};
