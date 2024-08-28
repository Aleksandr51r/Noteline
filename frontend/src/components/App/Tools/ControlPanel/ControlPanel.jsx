import React from "react"
import "./ControlPanel.css"
import NoteForm from "../NoteForm/NoteForm"
import TodoForm from "../TodoForm/TodoForm"
import "../Tools-style.css"
import { useSelector } from "react-redux"
import { selectSelectedCategory } from "../../../../redux/slices/contentSlice"

function ControlPanel() {
  const exeptionsList = ["trashcan", "favorites", "kanban"]

  const selectedCategory = useSelector(selectSelectedCategory)

  return (
    <div className='control-panel'>
      {exeptionsList.includes(selectedCategory.name) ? null : (
        <>
          <NoteForm />
          <TodoForm />
        </>
      )}
    </div>
  )
}

export default ControlPanel
