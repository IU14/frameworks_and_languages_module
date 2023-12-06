// variables that import modules required for the server to run
const express = require('express')
const path = require('path')
const cors = require('cors')

// variables that declare use of the express framework and setting up the port for the server
const app = express()
const port = 8000

// sets up imports that the application uses 
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));

//variable that sets the dates to the ISO format 
const isoDate = new Date().toISOString()

//loads the application and launches 
app.get('/', (req, res) => {
   
    res.send("Welcome to the the FreeCycle website")

})

// sets up the ITEM object
ITEM = {
  1: {
      "id": 1,
      "user_id": "user1234", 
      "keywords": [
        "hammer",
        "nails",
        "tools"
      ],
      "description": "A hammer and nails set",
      "image": "https://placekitten.com/200/300",
      "lat": 51.2798438,
      "lon": 1.0830275,
      "date_from": isoDate,
      "date_to": isoDate,
  },
  
};

// function that returns item by item id
app.get('/item/:id', (req, res) => {
  const id = req.params.id

  if (!ITEM[id])
  {
    console.log("Item does not exist")
    res.status(404).json()
  }
    
  else 
    console.log  (ITEM[id])
    return res.status(200).json(ITEM[id])
})

// function that returns all of the items
app.get('/items', (req, res) => {
  res.status(200).json(Object.values(ITEM))
  console.log(ITEM)
})

// function creates item and posts it - also checks all the required fields are present before creating 
app.post('/item', (req, res, next) => {
  console.log(req.body)
  const reqFields =["user_id","keywords","description","lat","lon"]; 
 
  if (!reqFields.every(field=> req.body.hasOwnProperty(field)))
  {
    console.log("Missing data")
    return res.status(405).json()
  }
 
// Variable that creates a new object (ITEM) & make sure the ID becomes the key to object
  const newITEM = {};

//variable that sets a random unique ID
  const newID= Math.random();

  for (let [key, value] of Object.entries(req.body)){
    newITEM[key] = value;
  }

// takes the input from the client & creates the object (ITEM) 
  ITEM[newID] = {
    "id": newID,
    "user_id": req.body.user_id,
    "keywords":req.body.keywords,
    "description": req.body.description,
    "image" : req.body.image,
    "lat": req.body.lat,
    "lon": req.body.lon,
    "date_from" : isoDate, 
    "date_to": isoDate,

},
    res.status(201).json(ITEM[newID])
    console.log(ITEM)
})


// deletes item by item id from the dictionary 
app.delete('/item/:id', (req, res) => {
  const id = req.params.id  // takes the input and checks it exits & deletes if it does

  if (ITEM[id]){
    delete ITEM[id]
    console.log("Item deleted") 
    return res.status(204).json()
    }
  else 
    console.log("No such item to delete")
    res.status(404).json()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
