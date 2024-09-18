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
  
  // Checking for  undefined
  const categoryName = selectedCategory ? selectedCategory.name : ""

  return (
    <div className='control-panel'>
      {!exeptionsList.includes(categoryName) && (
        <>
          <NoteForm />
          {/* <TodoForm /> */}
        </>
      )}
    </div>
  )
}

export default ControlPanel

