const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

const dateStamp = new Date();

//gets HTML from the client directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../client/index.html') );
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
      "date_from": dateStamp.toISOString(),
      "date_to": dateStamp.toISOString(),
  },
  
};


// returns item 
app.get('/item', (req, res) => {
  res.json(ITEM)
})


// posts items 
app.post('/item', (req, res) => {

  const reqFields =["user_id","keywords","description","lat","lon"];
 
  if (!reqFields.every(field=> req.body.hasOwnProperty(field)))
  {
    console.log("Missing data")
    return res.status (405).json()
  }
 
  const newITEM = {};
  
  ITEM[newITEM] = {
      "id": Math.random(),
      "user_id": req.body.user_id,
      "keywords":req.body.keywords,
      "description": req.body.description,
      "image" : req.body.image,
      "lat": req.body.lat,
      "lon": req.body.lon,
      "date_from" : dateStamp.toISOString(), 
      "date_to": dateStamp.toISOString(),
},
    res.status(201).json(ITEM)
    console.log(ITEM)
})


// delete item
app.delete('/item/:id', (req, res) => {
  const id = parseFloat(req.params.id)

  if (id == req.params.id){
    delete ITEM
    console.log("Item deleted") 
    return res.status(204).json()
    
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/* to do:
return item by item ID
return HTML to the user (failed test)
ISSUE: when posting an object states its an [object object] and not the item number therefore getting a failure. 
recording 54
*/ 