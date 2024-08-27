import React from "react"
import "./ControlPanel.css"
import NoteForm from "../NoteForm/NoteForm"
import TodoForm from "../TodoForm/TodoForm"
import "../Tools-style.css"
import { useSelector } from "react-redux"
import { selectSelectedCategory } from "../../../../redux/slices/contentSlice"
function ControlPanel() {
  const selectedCategory = useSelector(selectSelectedCategory)

  return (
    <div className='control-panel'>
      <NoteForm
        additionalClassName={
          selectedCategory.name === "trashcan" ? "btn-disabled" : ""
        }
      />
      <TodoForm
        additionalClassName={
          selectedCategory.name === "trashcan" ? "btn-disabled" : ""
        }
      />
    </div>
  )
}

export default ControlPanel
