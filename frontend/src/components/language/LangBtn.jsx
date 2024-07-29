import React from "react"
import "./LangButton.css"

function LangBtn({ onClick, source, Component }) {
  return (
    <button className='flag-button' onClick={onClick}>
      <img src={source} alt='' />
    </button>
  )
}

export default LangBtn
