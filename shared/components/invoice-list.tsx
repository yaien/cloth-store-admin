import { Invoice } from "chillhood";
import { FC } from "react";
import { Col, Row } from "reactstrap";
import { InvoiceCard } from "./invoice-card";

export interface InvoiceListProps {
  invoices: Invoice[];
  onComplete?(invoice: Invoice): void;
  onShowCart?(invoice: Invoice): void;
  onShowTransport?(invoice: Invoice): void;
}

export const InvoiceList: FC<InvoiceListProps> = (props) => {
  return (
    <Row>
      {props.invoices.map((invoice) => (
        <Col key={invoice.id} md={6} className="mb-3">
          <InvoiceCard
            invoice={invoice}
            onComplete={props.onComplete}
            onShowCart={props.onShowCart}
            onShowTransport={props.onShowTransport}
          />
        </Col>
      ))}
    </Row>
  );
};
