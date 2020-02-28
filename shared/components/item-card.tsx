import { FC } from "react";
import { Item } from "../../lib/store";
import { Card, CardTitle, CardBody } from "reactstrap";

export interface ItemProps {
  item: Item
}

export const ItemCard: FC<ItemProps> = ({ item }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          {item.name}
        </CardTitle>
      </CardBody>
    </Card>
  )
}

export default ItemCard