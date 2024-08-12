import React from "react"
import "./ControlPanel.css"
import NoteForm from "../NoteForm/NoteForm"
import TodoForm from "../TodoForm/TodoForm"
import "../Tools-style.css"

function ControlPanel() {
  return (
    <div className='control-panel'>
      <NoteForm />
      <TodoForm />
    </div>
  )
}

export default ControlPanel
