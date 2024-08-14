import React from "react"
import { GiNotebook } from "react-icons/gi"
import "../Tools-style.css"

function NoteForm({ additionalClassName = "", onClick }) {
  return (
    <button className='btn-tool' onClick={onClick}>
      <GiNotebook className={`btn-tool-icon btn-note ${additionalClassName}`} />
    </button>
  )
}

export default NoteForm
