import { FC } from "react";
import { Item, Picture } from "../../lib/store";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,
  CardImg,
  CardFooter,
  Button,
} from "reactstrap";
import ImageCarousel from "./image-carousel";
import Link from "next/link";

export interface ItemProps {
  item: Item;
}

const ItemCardImg: FC<{ pictures?: Picture[] }> = ({ pictures }) => {
  if (pictures && pictures.length) {
    return <ImageCarousel pictures={pictures} />;
  }
  return (
    <CardImg
      top
      width="100%"
      src="https://reactstrap.github.io/assets/318x180.svg"
      alt="Card image cap"
    />
  );
};

export const ItemCard: FC<ItemProps> = ({ item }) => {
  return (
    <Card>
      <ItemCardImg pictures={item.pictures} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        <CardSubtitle>${item.price.toLocaleString()}</CardSubtitle>
        <CardText>{item.description}</CardText>
      </CardBody>
      <CardFooter>
        <Link href={"/items/" + item.id}>
          <Button block color="primary">
            EDITAR
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
