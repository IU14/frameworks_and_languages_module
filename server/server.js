const express = require('express')
const app = express()
const port = 8000
const path = require('path');
//const cors = require('cors')


//app.get('/workspaces/frameworks_and_languages_module/client', (req, res) => {
  //res.sendFile(path.join(__dirname, '/index.html') );
//})

app.get('/',  (req, res) => {
    res.sendFile('index.html',{root: __dirname});
})

const ITEM = [
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

app.get('/item', (req, res) => {
  res.json(ITEM)
})

app.post('/item', (req, res) => {
  res.status(201).json()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})