import { FC, useMemo } from "react";
import { Invoice, InvoiceStatus } from "chillhood";
import {
  Card,
  CardHeader,
  Badge,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
} from "reactstrap";

export interface InvoiceCardProps {
  invoice: Invoice;
  onComplete?(invoice: Invoice): void;
  onShowCart?(invoice: Invoice): void;
  onShowTransport?(invoice: Invoice): void;
}

export const InvoiceCard: FC<InvoiceCardProps> = ({
  invoice,
  onComplete,
  onShowCart,
  onShowTransport,
}) => {
  const badge = useMemo(() => {
    switch (invoice.status) {
      case InvoiceStatus.Accepted:
        return { text: "aprobada", color: "success" };
      case InvoiceStatus.Pending:
        return { text: "pendiente", color: "secondary" };
      case InvoiceStatus.Rejected:
        return { text: "rechazada", color: "danger" };
      case InvoiceStatus.Created:
        return { text: "creada", color: "warning" };
      case InvoiceStatus.Completed:
        return { text: "completada", color: "primary" };
    }
  }, [invoice.status]);

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center flex-wrap p-1">
        Ref. {invoice.ref}
        <ButtonGroup size="sm">
          {onShowCart && (
            <Button color="success" onClick={() => onShowCart(invoice)}>
              <i className="fas fa-tshirt"></i>
            </Button>
          )}
          {invoice.status == InvoiceStatus.Accepted && onComplete && (
            <Button color="primary" onClick={() => onComplete(invoice)}>
              <i className="fas fa-truck"></i>
            </Button>
          )}
          {invoice.status == InvoiceStatus.Completed && onShowTransport && (
            <Button color="success" onClick={() => onShowTransport(invoice)}>
              <i className="fas fa-shipping-fast"></i>
            </Button>
          )}
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
