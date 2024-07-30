import React from "react"
import "./LangButton.css"

function LangBtn({ onClick, source, text }) {
  return (
    <button className='flag-button' onClick={onClick}>
      <img src={source} alt={text} />
    </button>
  )
}

export default LangBtn
