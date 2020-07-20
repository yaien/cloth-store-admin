import auth from "../../../../core/middlewares/auth";

export default auth(async (req, res) => {
  const id = req.query.id as string;
  const transport = req.body;
  const invoice = await req.session.invoices.setTransport(id, transport);
  res.send(invoice);
});
