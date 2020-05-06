const express = require("express")

const server = express()

server.use(express.json())

// Blog Post Structure
let posts = [{
  title: "The post title", // String, required
  contents: "The post contents", // String, required
  created_at: Date(), // Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Date() // Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}]

let comments = {
  text: "The text of the comment", // String, required
  post_id: "The id of the associated post", // Integer, required, must match the id of a post entry in the database
  created_at: Date(),// Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Date()// Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}



server.post("/api/posts", (req, res)=>{
 let newPost = req.body
  if (!newPost.title || !newPost.contents)
 {
  res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
 }
 else{
   posts.push(newPost)
  res.status(201).json(posts)
 }
})  // POST

server.post("/api/posts/:id/comments",(req, res)=>{

}) // POST

server.get("/api/posts", (req, res)=>{
res.json(posts)
}) // GET

server.get("/api/posts/:id", (req, res)=>{

}) // GET

server.get("/api/posts/:id/comments", (req, res)=>{

}) // GET

server.delete("/api/posts/:id", (req, res)=>{

}) // DELETE

server.put("/api/posts/:id", (req, res)=>{

}) // PUT

server.listen(5000)