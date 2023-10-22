const express = require('express')
const app = express()
const port = 8000
const path = require('path');

app.get('/workspaces/frameworks_and_languages_module/client', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html') );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})