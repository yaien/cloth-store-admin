import { FC } from "react";
import { Item } from "chillhood";
import { Button } from "reactstrap";

export interface PublishButtonProps {
  item: Item;
  onUnpublish?(): void;
  onPublish?(): void;
}

export const PublishButton: FC<PublishButtonProps> = (props) => {
  if (props.item.active) {
    return (
      <Button size="sm" color="warning" onClick={props.onUnpublish}>
        DESPUBLICAR
      </Button>
    );
  }
  return (
    <Button size="sm" color="primary" onClick={props.onPublish}>
      PUBLICAR
    </Button>
  );
};

export default PublishButton;
