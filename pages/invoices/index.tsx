import {
  FunctionComponent as FC,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useAPI, useToggler } from "../../shared/hooks";
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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { InvoiceStatus, Invoice, ShippingStatus, Transport } from "chillhood";
import { InvoiceList } from "../../shared/components/invoice-list";
import { TransportForm } from "../../shared/components/transport-form";
import CartDetail from "../../shared/components/cart-detail";
import { useRouter } from "next/router";

const Invoices = () => {
  const api = useAPI();
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>();
  const [status, setStatus] = useState(InvoiceStatus.Accepted);
  const [current, setCurrent] = useState<Invoice>();
  const completion = useToggler();
  const transport = useToggler();
  const cart = useToggler();

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onStatusChange(e: ChangeEvent<HTMLInputElement>) {
    setStatus(e.target.value as InvoiceStatus);
  }

  function onComplete(invoice: Invoice) {
    setCurrent(invoice);
    completion.toggle();
  }

  async function setTransport(transport: Transport) {
    try {
      if (!current) return;
      const invoice = await api.invoices.setTransport(current.id, transport);
      const newInvoices = invoices.map((inv) =>
        inv.id == invoice.id ? invoice : inv
      );
      setInvoices(newInvoices);
      completion.toggle();
    } catch (err) {
      console.error(err);
    }
  }

  function onShowTransport(invoice: Invoice) {
    setCurrent(invoice);
    transport.toggle();
  }

  function onShowCart(invoice: Invoice) {
    setCurrent(invoice);
    cart.toggle();
  }

  useEffect(() => {
      if (router.query.search) {
        let search = Array.isArray(router.query.search) ? router.query.search[0] : router.query.search
        setSearch(search)
      }
  }, [router.query])

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
                    <option value={InvoiceStatus.Completed}>Completadas</option>
                    <option value={InvoiceStatus.Accepted}>Aprobadas</option>
                    <option value={InvoiceStatus.Pending}>Pendientes</option>
                    <option value={InvoiceStatus.Rejected}>Rechazadas</option>
                  </Input>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <InvoiceList
                  invoices={invoices}
                  onComplete={onComplete}
                  onShowTransport={onShowTransport}
                  onShowCart={onShowCart}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Modal isOpen={completion.isOpen} toggle={completion.toggle}>
          <ModalHeader toggle={completion.toggle}>Actualizar envio</ModalHeader>
          <ModalBody>
            <TransportForm onSubmit={setTransport} />
          </ModalBody>
        </Modal>
        <Modal isOpen={transport.isOpen} toggle={transport.toggle}>
          <ModalHeader toggle={transport.toggle}>
            Ver información de envio
          </ModalHeader>
          <ModalBody>
            {current && current.shipping.status == ShippingStatus.Sended && (
              <TransportForm transport={current.shipping.transport} disabled />
            )}
          </ModalBody>
        </Modal>
        <Modal isOpen={cart.isOpen} toggle={cart.toggle}>
          <ModalHeader toggle={cart.toggle}>Ver detalles de compra</ModalHeader>
          <ModalBody>{current && <CartDetail cart={current.cart} />}</ModalBody>
        </Modal>
      </Container>
    </Dash>
  );
};

export default Invoices;
