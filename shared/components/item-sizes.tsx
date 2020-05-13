import { FC, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import SizeTable from "./size-table";
import { Size } from "../../lib/store";
import { useToggler } from "../hooks";
import { SizeForm } from "./size-form";

export interface ItemSizesProps {
  sizes?: Size[];
  onChange?(sizes: Size[]): void;
}

export const ItemSizes: FC<ItemSizesProps> = (props) => {
  const [sizes, setSizes] = useState<Size[]>(props.sizes ?? []);
  const [size, setSize] = useState<Size>();
  const modal = useToggler();

  useEffect(() => {
    if (props.onChange) {
      props.onChange(sizes);
    }
  }, [sizes]);

  const key = (size: Size) => size.label.toLowerCase();

  const save = (size: Size) => {
    const exists = sizes.some((s) => key(s) == key(size));
    if (exists) {
      setSizes(sizes.map((s) => (key(s) == key(size) ? size : s)));
    } else {
      setSizes([...sizes, size]);
    }
    modal.toggle();
  };

  const remove = (size: Size) => {
    let nextSizes = sizes.filter((s) => s.label != size.label);
    setSizes(nextSizes);
  };

  const create = () => {
    setSize(null);
    modal.toggle();
  };

  const edit = (size: Size) => {
    setSize(size);
    modal.toggle();
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        Tallas
        <Button type="button" size="sm" color="primary" onClick={create}>
          Agregar
        </Button>
      </CardHeader>
      <SizeTable sizes={sizes} onDelete={remove} onEdit={edit} />
      <Modal isOpen={modal.isOpen} toggle={modal.toggle}>
        <ModalHeader toggle={modal.toggle}>Guardar Talla</ModalHeader>
        <ModalBody>
          <SizeForm onSubmit={save} size={size} />
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default ItemSizes;
