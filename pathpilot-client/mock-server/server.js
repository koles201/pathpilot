const jsonServer = require("json-server")

const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post("/auth/registration", (req, res) => {
  console.log("POST /auth/registration", req.body)

  res.status(200).json({
    message: "Success",
    userId: Date.now(),
  })
})

server.use(router)

server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001")
})
