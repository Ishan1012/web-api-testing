import React from 'react'
import './styles/Content.css'

const QueryForm = () => {
  return (
    <div className="query-container">
      <h1>Add Test Case</h1>
      <form action="" method="post">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <div className="inner-container">
          <div className="left-container">
            <div className="method-container">
              <label htmlFor="method" id='methodName'>Method</label>
              <select name="method" id="method">
                <option value="method">Method</option>
                <option value="get">GET</option>
                <option value="post">POST</option>
              </select>
            </div>
            <div className="code-container">
              <label htmlFor="code" id='statusCode'>Status Code</label>
              <select name="code" id="code">
                <option value="200">200</option>
                <option value="201">201</option>
                <option value="204">204</option>
                <option value="400">400</option>
                <option value="401">401</option>
                <option value="403">403</option>
                <option value="404">404</option>
                <option value="500">500</option>
              </select>
            </div>
          </div>
          <div className="right-container">
            <label htmlFor="url">URL</label>
            <input type="url" name="url" id="url" />
            <label htmlFor="key">Expected JSON Key</label>
            <input type="text" name="key" id="key" placeholder='Value'/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default QueryForm