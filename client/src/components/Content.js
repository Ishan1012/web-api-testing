import React from 'react'
import './styles/Content.css'
import QueryForm from './QueryForm'
import QueryTable from './QueryTable'
import axios from 'axios';
import { useState, useEffect } from 'react';

const Content = () => {

  const [tests, setTests] = useState([]);

  function getPosts() {
    axios.get('https://web-api-testing-production.up.railway.app/api/testcases')
      .then(res => setTests(res.data))
      .catch(err => console.error('Error fetching test cases:', err));
  }

  useEffect(() => getPosts(), []);

  return (
    <div className="container">
      <div className="query-form"><QueryForm getPosts={getPosts} /></div>
      <div className="query-table"><QueryTable tests={tests} setTests={setTests} getPosts={getPosts} /></div>
    </div>
  )
}

export default Content