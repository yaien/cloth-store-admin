import { FC, useMemo } from "react";
import { Cart, Item, CartItem } from "chillhood";
import { Row, Col, ListGroup, ListGroupItem, Badge } from "reactstrap";
import { useAPI } from "../hooks";
import { Cloudinary } from "cloudinary-core";

export interface CartDetailProps {
  cart: Cart;
}

export const CartDetail: FC<CartDetailProps> = ({ cart }) => {
  return (
    <div>
      {cart.items.map((item) => (
        <CartDetailItem key={item.id} item={item} />
      ))}
      <div className="d-flex justify-content-center">
        <Badge color="success" className="m-1">
          Subtotal ${cart.subtotal.toLocaleString()}
        </Badge>
      </div>
    </div>
  );
};

export default CartDetail;

export interface CartDetailItemProps {
  item: CartItem;
}

const CartDetailItem: FC<CartDetailItemProps> = ({ item }) => {
  const api = useAPI();

  if (!api.settings.cloudinary) {
    return null;
  }

  const url = useMemo(() => {
    const cloudinary = new Cloudinary({
      cloud_name: api.settings.cloudinary.cloud,
    });

    if (!item.picture) {
      return "https://reactstrap.github.io/assets/318x180.svg";
    }

    return cloudinary.url(item.picture.reference, {
      width: 318,
      height: 340,
      responsive: true,
      crop: "scale",
    });
  }, [item.id]);

  return (
    <Row>
      <Col md={4}>
        <img src={url} className="w-100" alt="" />
      </Col>
      <Col md={8}>
        <div>{item.name}</div>
        <div>
          <Badge color="success" className="mr-2">
            Talla {item.size}
          </Badge>
          <Badge color="primary" className="mr-2">
            Precio ${item.price.toLocaleString()}
          </Badge>
        </div>
      </Col>
    </Row>
  );
};
