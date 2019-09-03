const express = require('express')
const app = express()
const port = process.env.PORT || 1146
const whois = require('whois-json')

const whoisQuery = async (props) => {
  const results = await whois(props.domain)
  return results
}

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

app.post('/check', async (req, res) => {
  const result = {
    success: false
  }

  try {
    const whoisResult = await whoisQuery({
      domain: req.body.domain
    })

    result.success = true
    result.whois = whoisResult
    res.send(result)
  } catch (e) {
    result.error = e
    res.send(result)
  }
})
