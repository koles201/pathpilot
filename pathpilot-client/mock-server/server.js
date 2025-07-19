// eslint-disable-next-line @typescript-eslint/no-require-imports
const jsonServer = require("json-server")
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PATH } = require("../src/shared/config/routes")

const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post(PATH.AUTH.REGISTRATION, (req, res) => {
  res.status(200).json({
    message: "Success",
    userId: Date.now(),
  })
})

server.post(PATH.AUTH.LOGIN, (req, res) => {
  res.status(200).json({
    message: "Success",
    userId: Date.now(),
  })
})

server.use(router)

server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001")
})
