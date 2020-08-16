import { Row, Table, ButtonGroup, Button } from "reactstrap";
import { Size } from "chillhood";
import { FC } from "react";

export interface SizeTableProps {
  sizes: Size[];
  onDelete?(size: Size): void;
  onEdit?(size: Size): void;
}

export const SizeTable: FC<SizeTableProps> = ({ sizes, onDelete, onEdit }) => {
  return (
    <Table className="text-center" size="sm">
      <thead>
        <tr>
          <th>Talla</th>
          <th>Cantidad</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {sizes.map((size) => (
          <tr key={size.label}>
            <td>{size.label}</td>
            <td>{size.existence}</td>
            <td>
              <ButtonGroup size="sm">
                <Button color="danger" onClick={onDelete?.bind(null, size)}>
                  <i className="fa fa-close"></i>
                </Button>
                <Button color="warning" onClick={onEdit?.bind(null, size)}>
                  <i className="fa fa-edit"></i>
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SizeTable;
