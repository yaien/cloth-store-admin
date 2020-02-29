import { FC } from "react";
import { Item } from "../../lib/store";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,
  CardImg
} from "reactstrap";

export interface ItemProps {
  item: Item;
}

export const ItemCard: FC<ItemProps> = ({ item }) => {
  return (
    <Card>
      <CardImg
        top
        width="100%"
        src="https://reactstrap.github.io/assets/318x180.svg"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        <CardSubtitle>${item.price.toLocaleString()}</CardSubtitle>
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
};

export default ItemCard;
