import React from "react"
import "./ControlPanel.css"
import NoteForm from "../NoteForm/NoteForm"
import TodoForm from "../TodoForm/TodoForm"
import "../Tools-style.css"

import { useDispatch, useSelector } from "react-redux"
import {
  selectSelectedCategory,
  toggleAddingNewNote,
  toggleAddingNewTodo
} from "../../../../redux/slices/contentSlice"


function ControlPanel() {
  const dispatch = useDispatch()

  const selectedCategory = useSelector(selectSelectedCategory)
  const handleAddNewNote = () => {
    dispatch(toggleAddingNewNote())
  }
  const handleAddNewTodo = () => {
    dispatch(toggleAddingNewTodo())
  }

  return (
    <div className='control-panel'>
      <NoteForm onClick={handleAddNewNote} />
      <TodoForm onClick={handleAddNewTodo}/>
    </div>
  )
}

export default ControlPanel
