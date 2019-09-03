import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, Input } from 'rfv'

import './style.scss'

const validations = {
  domain: [
    {
      rule: 'isFQDN',
      invalidFeedback: 'Please provide a valid domain (eg: google.com)'
    }
  ]
}

const App = () => {
  const [whoisResult, setWhoisResult] = useState({})

  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const onSubmit = (res) => {
    setFormIsSubmitting(res.isFormValid)
  }
  const postSubmit = (res) => {
    setFormIsSubmitting(false)
    setWhoisResult(res.data.whois)
  }

  const postOptions = {
    method: 'post',
    url: 'https://whoiz.glitch.me/check'
  }

  return (
    <div className='container'>
      <Form
        className='ui form'
        onSubmit={onSubmit}
        postSubmit={postSubmit}
        postOptions={postOptions}>
        <fieldset disabled={formIsSubmitting}>
          <div className='form-group'>
            <Input
              type='url'
              name='domain'
              placeholder='google.com'
              value='google.com'
              validations={validations.domain}
              className='form-control form-control-lg' />
          </div>

          <button className='btn btn-lg btn-block btn-primary'>
            Submit
          </button>
        </fieldset>
      </Form>

      <div className='whoisResult'>
        {Object.keys(whoisResult).map((whoisResultKey, index) => {
          const whoisResultValue = whoisResult[whoisResultKey]

          return (
            <div
              key={index}
              className='infoGroup'>
              <div className='infoKey'>
                {whoisResultKey}
              </div>

              <div className='infoValue'>
                {whoisResultValue}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
