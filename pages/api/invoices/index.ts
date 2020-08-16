import auth from "../../../core/middlewares/auth";

export default auth(async (req, res) => {
  const invoices = await req.session.invoices.find(req.query);
  res.send(invoices);
});
