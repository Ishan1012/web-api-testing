import React from 'react'
import './styles/Content.css'
import QueryForm from './QueryForm'
import QueryTable from './QueryTable'

const Content = () => {
  return (
    <div className="container">
      <div className="query-form"><QueryForm /></div>
      <div className="query-table"><QueryTable /></div>
    </div>
  )
}

export default Content