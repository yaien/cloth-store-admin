import { Picture } from "../../lib/store";
import { FC } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import ImageInput from "./image-input";
import ImageList from "./image-list";

export interface ItemPicturesProps {
  pictures?: Picture[];
  onAdded?(picture: Picture): void;
  onPositionChange?(pictures: Picture[]): void;
  onRemove?(picture: Picture, position: number): void;
}

export const ItemImages: FC<ItemPicturesProps> = ({
  onAdded,
  pictures,
  onPositionChange,
  onRemove,
}) => {
  return (
    <Card>
      <CardHeader className="d-flex justify-content-between">
        <div>Imagenes</div>
        <div className="">
          <ImageInput onAdded={onAdded} />
        </div>
      </CardHeader>
      <CardBody>
        {pictures && pictures.length && (
          <ImageList
            pictures={pictures}
            onPositionChange={onPositionChange}
            onRemove={onRemove}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default ItemImages;
