import auth from "../../../core/middlewares/auth";

export default auth(async (req, res) => {
  const id = req.query.id as string;
  switch (req.method) {
    case "GET":
      res.send(await req.session.items.get(id));
      break;
    case "PUT":
      res.send(await req.session.items.update(id, req.body));
      break;
    default:
      res.status(405).end();
  }
});
