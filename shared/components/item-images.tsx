import { Picture } from "../../lib/store";
import { FC } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import ImageInput from "./image-input";
import ImageList from "./image-list";

export interface ItemPicturesProps {
  pictures?: Picture[];
  onAdded?(picture: Picture): void;
}

export const ItemImages: FC<ItemPicturesProps> = ({ onAdded, pictures }) => {
  return (
    <Card>
      <CardHeader className="d-flex justify-content-between">
        <div>Imagenes</div>
        <div className="">
          <ImageInput onAdded={onAdded} />
        </div>
      </CardHeader>
      <CardBody>
        <div className="d-flex justify-content-center">
          {pictures && <ImageList pictures={pictures} />}
        </div>
      </CardBody>
    </Card>
  );
};

export default ItemImages;
