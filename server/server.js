const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));

//const dateStamp = new Date();
//const currentDate = dateStamp.toISOString()
const isoDate = new Date().toISOString()

//gets HTML 

app.get('/', (req, res) => {
    //res.sendFile('index.html', {root: __dirname}); 
    res.send("Hello world")

    //find video on this

    //const DEFAULT_API = '/api/v1';  // default to current http(s)://currentHost:currentPort/api/v1'
    //const urlParams = new URLSearchParams(window.location.search);
    //const urlAPI = (urlParams.get('api') || DEFAULT_API).replace(/\/$/, '');  // Get api url (and remove trailing slash if present)

})

// sets up ITEM 
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

const list = Object.keys(ITEM).map((key) => [key, ITEM[key]]);

// returns item by item id
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

// returns list
app.get('/items', (req, res) => {
  //const list = Object.keys(ITEM).map((key) => [key, ITEM[key]]);

  res.status(200).json(list)
  console.log(list)
})

// posts items 
app.post('/item', (req, res, next) => {
  const reqFields =["user_id","keywords","description","lat","lon"]; // checks for req fields 1st
 
  if (!reqFields.every(field=> req.body.hasOwnProperty(field)))
  {
    console.log("Missing data")
    return res.status(405).json()
  }
 
  // creates new obj & make sure the ID becomes the key to obj
  const newITEM = {};
  const newID= Math.random();

  for (let [key, value] of Object.entries(req.body)){
    newITEM[key] = value;
  }

  // takes the input & creates
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
    list.push(ITEM)
    res.status(201).json(ITEM[newID])
    if (list.includes(ITEM)){
      console.log ("Item exists")
    }
})


// delete item
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

/* to do:
failed tests as of 3/11:
Base endpoint should return html of some form to the user. 
After POSTing an item, a GET to /items should have our new item as a last entry of the list/array [done]
date_from has been created and is a pauseable ISO date time 
Create new_item and check that it appears in the items list 
recording 54
*/ 