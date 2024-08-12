import React from "react"
import { GiNotebook } from "react-icons/gi"
import "../Tools-style.css"

function NoteForm({ additionalClassName = "" }) {
  return (
    <button className='btn-tool'>
      <GiNotebook className={`btn-tool-icon btn-note ${additionalClassName}`} />
    </button>
  )
}

export default NoteForm
