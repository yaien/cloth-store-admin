import auth from "../../../../core/middlewares/auth";

export default auth(async (req, res) => {
  const invoice = await req.session.invoices.get(req.query.id as string);
  res.send(invoice);
});
