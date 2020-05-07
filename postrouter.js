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
    else if (!req.body.text)
    {
      res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    else if (req.body.text)
    {
      let comment = {text: req.body.text, post_id: id}
      
      db.insertComment(comment).then(helenOfTroy =>
      {
        
        res.status(201).json({helenOfTroy})

      }).catch(error=>{res.status(201).json("Caught up")}
      )}
    else
    {
      res.status(500).json({ error: "There was an error while saving the comment to the database" })
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

}) 

router.get("/:id", (req, res) =>
{
  let id = req.params.id

  db.findById(id).then(Barnabas=>{
    res.status(201).json(Barnabas) // WHEN CATCH IS ACTIVE, IT DEFAULTS TO CATCH, OTHERWISE IT WORKS!! 
  })
  // .catch(res.status(400).json("Not found"))
})

router.get("/:id/comments", (req, res) =>
{
  

  db.findCommentById(req.params.id).then(Barnabas=>{
    res.status(201).json(Barnabas)
  })
})

router.delete("/:id", (req, res) =>
{
  db.remove(req.params.id).then(stuff=>{
    res.status(201).json(stuff)
  })

}) // DELETE

router.put("/:id", (req, res) =>
{
  // res.status(201).json(req.body)

  db.update(req.params.id, req.body).then(stuff =>{
    res.status(201).json(stuff)
  })
}) // PUT





module.exports = router
