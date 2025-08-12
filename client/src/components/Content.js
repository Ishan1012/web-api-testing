import './styles/Content.css'
import QueryForm from './QueryForm'
import QueryTable from './QueryTable'
import axios from 'axios';
import { useState, useEffect } from 'react';

const Content = () => {

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  function getPosts() {
    axios.get('https://web-api-testing.onrender.com/api/testcases')
      .then(res => {
        setTests(res.data);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching test cases:', err));
  }

  useEffect(() => getPosts(), []);

  return (
    <div className="container">
      <div className="query-form"><QueryForm getPosts={getPosts} loading={loading} setLoading={setLoading} /></div>
      <div className="query-table"><QueryTable tests={tests} setTests={setTests} getPosts={getPosts} loading={loading} setLoading={setLoading} /></div>
    </div>
  )
}

export default Content