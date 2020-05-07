const express = require("express")
const server = express()
const postRouter = require("./postrouter")

server.use(express.json())

server.get("/", (req, res)=>{
  res.send("Server is running")
})

server.use("/api/posts", postRouter)  // passes postRouter as the function argument. Is this middleware? postRouter is imported from our own file. 

server.listen(5000)