// eslint-disable-next-line @typescript-eslint/no-require-imports
const jsonServer = require("json-server")

const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post("/auth/registration", (req, res) => {
  res.status(200).json({
    message: "Success",
    userId: Date.now(),
  })
})

server.post("/auth/login", (req, res) => {
  res.status(200).json({
    message: "Success",
    userId: Date.now(),
  })
})

server.use(router)

server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001")
})
