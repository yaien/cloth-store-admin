import auth from "../../../core/middlewares/auth";

export default auth(async (req, res) => {
  switch (req.method) {
    case "GET":
      let items = await req.session.items.list();
      return res.send(items);

    case "POST":
      let item = await req.session.items.create(req.body);
      return res.send(item);

    default:
      return res.status(404).end();
  }
});
