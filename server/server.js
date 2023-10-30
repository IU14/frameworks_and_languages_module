const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

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
  //2: {},
};
/*
ITEM[3] = {
}
delete ITEM[3]
ITEM.hasOwnProperty(3)
*/

// returns item 
app.get('/item', (req, res) => {
  res.json(ITEM)
})


// posts items 
app.post('/item', (req, res) => {

  const reqFields =["user_id","keywords","description","lat","lon"];
  //const dateStamp = new Date();

  if (!reqFields.every(field=> req.body.hasOwnProperty(field)))
  {
    console.log("Missing data")
    return res.status (405).json()
  }
 
  const newITEM = {
      "id": Math.random,
      "user_id": req.params.user_id,
      "keywords": req.params.keywords,
      "description": req.params.description,
      "image" : req.params.image,
      "lat": req.params.lat,
      "lon": req.params.lon,
      "date_from" : dateStamp.toISOString(), 
      "date_to": dateStamp.toISOString(),
  };

    ITEM[newITEM]
    res.status(201).json(ITEM)
    console.log(ITEM)
})


// delete item
app.delete('/item/:id', (req, res) => {
  // const id = parseFloat(req.params.id)
  ITEM = ITEM.filter((item)=> item.id!=req.params.id)
  res.status(204).json()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/* to do:
return item by item ID
get the automated fields set up & working (failed test) - item_id, dates 
return HTML to the user (failed test)


recording 54
*/ 