import React from 'react'
import './styles/Navbar.css'

const Navbar = () => {
  const clickButton = () => {
    alert("Button clicked!")
  }
  return (
    <div className="navbar-content">
      <button className="button" onClick={clickButton}>Add Test Case</button>
      <button className="button" onClick={clickButton}>View Test Case</button>
    </div>
  )
}

export default Navbar