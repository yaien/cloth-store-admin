import auth from "../../../core/middlewares/auth"

export default auth(async (req, res) => {
  const settings = await req.session.settings.cloudinary()
  res.send(settings)
})
