import { FC, useMemo } from "react";
import { Invoice, InvoiceStatus, ShippingStatus } from "chillhood";
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  ListGroup,
  ListGroupItem,
  Table,
  CardFooter,
  ButtonGroup,
  Button,
} from "reactstrap";
import items from "../../pages/api/items";

export interface InvoiceCardProps {
  invoice: Invoice;
}

export const InvoiceCard: FC<InvoiceCardProps> = ({ invoice }) => {
  const badge = useMemo(() => {
    switch (invoice.status) {
      case InvoiceStatus.Accepted:
        return { text: "aprobada", color: "success" };
      case InvoiceStatus.Pending:
        return { text: "pendiente", color: "primary" };
      case InvoiceStatus.Rejected:
        return { text: "rechazada", color: "danger" };
      case InvoiceStatus.Created:
        return { text: "creada", color: "warning" };
    }
  }, [invoice.status]);

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center flex-wrap p-1">
        Ref. {invoice.ref}
        <ButtonGroup size="sm">
          <Button color="success">
            <i className="fas fa-tshirt"></i>
          </Button>
          <Button color="primary">
            <i className="fas fa-truck"></i>
          </Button>
          <Button color="success">
            <i className="fas fa-shipping-fast"></i>
          </Button>
        </ButtonGroup>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-2">
          <i className="fa fa-tag mr-2 text-dark" />
          <div className="float-right">
            <Badge color={badge.color} className="text-uppercase">
              {badge.text}
            </Badge>
          </div>
        </ListGroupItem>
        <ListGroupItem className="p-2">
          <i className="fa fa-calendar mr-2 text-dark" />
          <div className="float-right">
            {new Date(invoice.createdAt).toLocaleDateString()}
          </div>
        </ListGroupItem>
        <ListGroupItem className="p-2">
          <i className="fa fa-user mr-2 text-dark" />
          <div className="float-right">{invoice.shipping.name}</div>
        </ListGroupItem>
        <ListGroupItem className="p-2">
          <i className="fa fa-envelope mr-2 text-dark"></i>
          <div className="float-right">{invoice.shipping.email}</div>
        </ListGroupItem>
        <ListGroupItem className="p-2">
          <i className="fa fa-phone mr-2 text-dark"></i>{" "}
          <div className="float-right">{invoice.shipping.phone}</div>
        </ListGroupItem>
        <ListGroupItem className="p-2">
          <i className="fa fa-map-marker mr-2 text-dark"></i>
          <div className="float-right">
            {invoice.shipping.city}, {invoice.shipping.province}
          </div>
        </ListGroupItem>
        <ListGroupItem className="p-2">
          <i className="fa fa-map mr-2 text-dark"></i>
          <div className="float-right">{invoice.shipping.address}</div>
        </ListGroupItem>
        <ListGroupItem className="p-2 d-flex flex-wrap justify-content-center">
          <Badge color="success" className="m-1">
            Subtotal ${invoice.cart.subtotal.toLocaleString()}
          </Badge>
          <Badge color="success" className="m-1">
            Costo de envio ${invoice.cart.shipping.toLocaleString()}
          </Badge>
          <Badge color="primary" className="m-1">
            Total ${invoice.cart.total.toLocaleString()}
          </Badge>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
