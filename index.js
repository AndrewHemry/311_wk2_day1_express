
const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.PORT || 4000

const { users } = require('./state')

let db = []
let nextID = 1

/* BEGIN - create routes here */

// LIST ALL USERS
// GET /users

app.get("/users", function(req, res){
  res.json(db)
})

// LIST SPECIFIC USERS
// GET /users/:id

app.get("/users/:id", function(req, res){
  let id = req.params.id
  let matchingItem

  for (let i = 0; i<db.length; i++){
    let entry = db[i]
    if(entry.id == id){
      matchingItem = entry
      break
    }
  }

  res.json(matchingItem)
})

// CREATE SPECIFIC USER GIVEN AN ID
// POST /users
// {
//   first_name: "..."
//   last_name: "..."
// }

app.post("/users", function (req, res){
  let payload = req.body
  let first_name = payload.first_name
  let last_name = payload.last_name
  let occupation = payload.occupation
  let city = payload.city
  let state = payload.state

  let id = nextID
  nextID++

  let userData = {
    id: id,
    first_name: first_name,
    last_name: last_name,
    occupation: occupation,
    city: city,
    state: state
  }

  db.push(userData)

  res.sendStatus(204)
})

// UPDATE EXISTING USER GIVEN AN ID
// PUT /users/:id
// {
//   first_name: "..."
//   last_name: "..."
// }

app.put("/users/:id", function(req, res){
  let id = req.params.id
  let matchingItem = db.find(function(element, index){
    if(element.id == id){
      return element
    }
  })

  if(matchingItem){
    matchingItem.first_name = req.body.first_name
    matchingItem.last_name = req.body.last_name
    matchingItem.occupation = req.body.occupation
    matchingItem.city = req.body.city
    matchingItem.state = req.body.state
  }

  res.sendStatus(204)
})

// DELETE SPECIFIC USERS GIVEN AN ID
// DELETE /users/:id

app.delete("/users/:id", function(req, res){
  let id = req.params.id
  for(let i = 0; i<db.length; i++){
    if(id == db[i].id){
      db.splice(i, 1)
      break
    }
  }
  res.sendStatus(204)
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))