import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, Input } from 'rfv'

import './style.scss'

const validations = {
  domain: [
    {
      rule: 'isFQDN',
      invalidFeedback: 'Please provide a valid domain'
    }
  ]
}

const App = () => {
  const [result, setResult] = useState()

  const postSubmit = (res) => {
    setResult(res.data.whois)
  }

  const postOptions = {
    method: 'post',
    url: 'https://whoiz.glitch.me/check'
  }

  return (
    <div>
      <Form
        postSubmit={postSubmit}
        postOptions={postOptions}>
        <div>
          <Input
            type='url'
            name='domain'
            placeholder='google.com'
            validations={validations.domain} />
        </div>

        <div>
          <button>Submit</button>
        </div>
      </Form>

      <pre id='result'>
        {result}
      </pre>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
