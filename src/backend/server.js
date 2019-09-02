const express = require('express')
const app = express()
const port = process.env.PORT || 1146
const whois = require('whois')

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.method, req.url)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.listen(port, () => {
  console.log('Example app listening on port http://localhost:' + port)
})

app.get('/', (req, res) => res.send('hey'))

app.post('/check', (req, res) => {
  const result = {
    success: false
  }

  console.log(req.body)

  whois.lookup(req.body.domain, function (err, data) {
    result.whois = data
    result.success = true
    res.send(result)
  })
})
