import { FC, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import SizeTable from "./size-table";
import { Size } from "../../lib/store";
import { useToggler } from "../hooks";
import { SizeForm } from "./size-form";

export interface ItemSizesProps {
  sizes?: Size[];
  onChange?(sizes: Size[]): void;
}

export const ItemSizes: FC<ItemSizesProps> = props => {
  const [sizes, setSizes] = useState<Size[]>(props.sizes ?? []);
  const addModal = useToggler();

  useEffect(() => {
    if (props.onChange) {
      props.onChange(sizes);
    }
  }, [sizes]);

  const add = (size: Size) => {
    const exists = sizes.some(s => {
      return s.label.toLowerCase() == size.label.toLocaleLowerCase();
    });
    if (exists) return;
    setSizes([...sizes, size]);
    addModal.toggle();
  };

  const remove = (size: Size) => {
    let nextSizes = sizes.filter(s => s.label != size.label);
    setSizes(nextSizes);
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        Tallas
        <Button
          type="button"
          size="sm"
          color="primary"
          onClick={addModal.toggle}
        >
          Agregar
        </Button>
      </CardHeader>
      <SizeTable sizes={sizes} onDelete={remove} />
      <Modal isOpen={addModal.isOpen} toggle={addModal.toggle}>
        <ModalHeader toggle={addModal.toggle}>Agregar Talla</ModalHeader>
        <ModalBody>
          <SizeForm onSubmit={add} />
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default ItemSizes;
