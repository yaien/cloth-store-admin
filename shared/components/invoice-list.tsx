import { Invoice } from "chillhood";
import { FC } from "react";
import { Col, Row } from "reactstrap";
import { InvoiceCard } from "./invoice-card";

export interface InvoiceListProps {
  invoices: Invoice[];
}

export const InvoiceList: FC<InvoiceListProps> = (props) => {
  return (
    <Row>
      {props.invoices.map((invoice) => (
        <Col key={invoice.id} md={6} className="mb-3">
          <InvoiceCard invoice={invoice} />
        </Col>
      ))}
    </Row>
  );
};
