import {
  FunctionComponent as FC,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useAPI } from "../../shared/hooks";
import Dash from "../../shared/components/dash";
import Head from "../../shared/components/head";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Spinner,
  InputGroupText,
} from "reactstrap";
import { InvoiceStatus, Invoice } from "chillhood";
import { InvoiceList } from "../../shared/components/invoice-list";

const Invoices = () => {
  const api = useAPI();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>();
  const [status, setStatus] = useState(InvoiceStatus.Accepted);

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onStatusChange(e: ChangeEvent<HTMLInputElement>) {
    setStatus(e.target.value as InvoiceStatus);
  }

  useEffect(() => {
    setLoading(true);
    api.invoices
      .find({ search, status })
      .then((invoices) => setInvoices(invoices))
      .finally(() => setLoading(false));
  }, [search, status]);

  return (
    <Dash>
      <Head title="Orders" />
      <Container className="mt-3 p-0" fluid>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            Facturas
            {loading && <Spinner className="float-right" size="sm" />}
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={8} className="mb-3">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-search"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="search"
                    name="search"
                    value={search || ""}
                    onChange={onSearchChange}
                    placeholder="consulta por referencia, nombre, correo o telefóno"
                  />
                </InputGroup>
              </Col>
              <Col md={4} className="mb-3">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Estado</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    name="status"
                    value={status || ""}
                    onChange={onStatusChange}
                  >
                    <option value={InvoiceStatus.Accepted}>Aprobadas</option>
                    <option value={InvoiceStatus.Pending}>Pendientes</option>
                    <option value={InvoiceStatus.Rejected}>Rechazadas</option>
                  </Input>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <InvoiceList invoices={invoices} />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </Dash>
  );
};

export default Invoices;
