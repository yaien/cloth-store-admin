import html5 from "react-dnd-html5-backend";
import { Picture } from "chillhood";
import { FC } from "react";
import { useAPI } from "../hooks";
import { Cloudinary } from "cloudinary-core";
import { useDrag, DndProvider, useDrop, DragObjectWithType } from "react-dnd";
import { Card, CardImg, Button, CardFooter } from "reactstrap";

interface Item extends DragObjectWithType {
  type: "picture";
  picture: Picture;
  position: number;
}
interface ImageItemProps {
  picture: Picture;
  url: string;
  position: number;
  onPositionChange?(from: number, to: number): void;
  onRemove?(picture: Picture, position: number): void;
}

const ImageItem: FC<ImageItemProps> = ({
  picture,
  url,
  position,
  onPositionChange,
  onRemove,
}) => {
  const [dragStyle, drag] = useDrag<Item, unknown, unknown>({
    item: { type: "picture", picture, position },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [dropStyle, drop] = useDrop({
    accept: "picture",
    drop: (item: Item) =>
      onPositionChange && onPositionChange(item.position, position),
    collect: (monitor) => ({
      border: monitor.isOver() ? "1px solid red" : "",
    }),
  });

  return (
    <div ref={drop} style={dropStyle}>
      <div ref={drag} style={dragStyle}>
        <Card className="m-3" style={{ cursor: "grab" }}>
          <div className="remove">
            <Button
              size="sm"
              color="danger"
              onClick={onRemove && (() => onRemove(picture, position))}
            >
              <i className="fa fa-close"></i>
            </Button>
          </div>
          <CardImg key={picture.reference} src={url} />
        </Card>
      </div>
      <style jsx>{`
        .remove {
          position: absolute;
          right: 0px;
        }
      `}</style>
    </div>
  );
};
export interface ImageListProps {
  pictures: Picture[];
  onPositionChange?(pictures: Picture[]): void;
  onRemove?(picture: Picture, position: number): void;
}

export const ImageList: FC<ImageListProps> = (props) => {
  const api = useAPI();
  const settings = api.settings.cloudinary;

  if (!settings) {
    return null;
  }

  const onPositionChange = (from: number, to: number) => {
    if (props.onPositionChange) {
      const pictures = [...props.pictures];
      const aux = pictures[from];
      pictures[from] = pictures[to];
      pictures[to] = aux;
      props.onPositionChange(pictures);
    }
  };

  const cloudinary = new Cloudinary({ cloud_name: settings.cloud });

  return (
    <DndProvider backend={html5}>
      <div className="d-flex justify-content-center flex-wrap">
        {props.pictures.map((picture, index) => (
          <ImageItem
            position={index}
            key={picture.reference}
            picture={picture}
            url={cloudinary.url(picture.reference, {
              crop: "scale",
              width: 318,
              height: 400,
            })}
            onPositionChange={onPositionChange}
            onRemove={props.onRemove}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default ImageList;
