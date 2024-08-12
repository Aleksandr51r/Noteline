import React from "react"
import { AiOutlineFileDone } from "react-icons/ai"
import { HiDocumentCheck } from "react-icons/hi2"
import "../Tools-style.css"

function TodoForm({ additionalClassName = "" }) {
  return (
    <button className='btn-tool'>
      <AiOutlineFileDone
        className={`btn-tool-icon btn-todo ${additionalClassName}`}
      />
    </button>
  )
}

export default TodoForm
