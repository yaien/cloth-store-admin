import { FC } from "react";
import { Item, Picture } from "chillhood";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,
  CardImg,
  CardFooter,
  Button,
  Badge,
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
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h6 className="m-0">{item.name}</h6>
          <div>
            {item.active && (
              <Badge className="mr-1" color="warning">
                PUBLICADO
              </Badge>
            )}
            <Badge color="success">${item.price.toLocaleString()}</Badge>
          </div>
        </div>
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
