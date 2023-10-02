const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

res.jsonp(null)
// => callback(null)

res.jsonp({"foo": "bar"})

res.status(500).jsonp({ error: 'message' })
// => callback({ "error": "message" })