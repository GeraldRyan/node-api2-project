const router = require("express").Router()
const db = require("./data/db")

// Code goes here


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



router.post("/", (req, res) =>
{
  let newPost = req.body
  if (!newPost.title || !newPost.contents)
  {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  else if (newPost.title && newPost.contents)
  {

    //  posts.push(newPost)  // Use the database 
    db.insert(newPost)

    db.find().then(posts =>
    {
      res.status(201).json(posts)
    })
  }
  else
  {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  }
})



router.post("/:id/comments", (req, res) =>
{
  let id = req.params.id

  db.findById(id).then(thePost =>
  {
    // If the _post_ with the specified `id` is not found:
    if (thePost.length == 0)
    {
      console.log(id)
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else
    {
      res.status(200).json({ thePost: thePost})
    }
  }
  )



})




router.get("/", (req, res) =>
{

  db.find().then(posts =>
  {
    res.status(201).json(posts)
  })

}) // GET

router.get("/api/posts/:id", (req, res) =>
{

}) // GET

router.get("/api/posts/:id/comments", (req, res) =>
{

}) // GET

router.delete("/api/posts/:id", (req, res) =>
{

}) // DELETE

router.put("/api/posts/:id", (req, res) =>
{

}) // PUT





module.exports = router
