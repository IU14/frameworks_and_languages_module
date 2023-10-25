const express = require('express')
const app = express()
const port = 8000
const path = require('path');
//const cors = require('cors');

//app.use(cors());

app.use(express.json());

//gets HTML from the client directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../client/index.html') );
})

// sets up ITEM 
let ITEM = [
  {
  "id": 0,
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
  "date_from": "2023-10-22T17:38:31.805Z",
  "date_to": "2023-10-22T17:38:31.805Z"
  }
]

// returns item 
app.get('/item', (req, res) => {
  res.json(ITEM)
})

//returns item by item ID
//item ID is auto generated 



// posts items 
app.post('/item', (req, res) => {
  if (Object.keys(req.body).sort().toString() != "description,image,keywords,lat,lon,user_id") {
    return res.status(405).json()
  }
    ITEM.push(req.body)
    res.status(201).json(req.body)
})

// delete item
app.delete('/item/:id', (req, res) => {
  ITEM = ITEM.filter((item)=> item.id!=req.params.id)
  res.status(204).json()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/* to do:
return item by item ID
CORS (failed test)
get the automated fields set up & working (failed test)
return HTML to the user (failed test)
recording 52 
*/ 