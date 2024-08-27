import React from "react"
import { AiOutlineFileDone } from "react-icons/ai"
import { HiDocumentCheck } from "react-icons/hi2"
import "../Tools-style.css"

import { useDispatch, useSelector } from "react-redux"
import {
  selectSelectedCategory,
  toggleAddingNewNote,
  toggleAddingNewTodo,
} from "../../../../redux/slices/contentSlice"

function TodoForm({ additionalClassName = "", onClick = null }) {
  const dispatch = useDispatch()

  const handleAddNewTodo = () => {
    dispatch(toggleAddingNewTodo())
  }

  return (
    <button className='btn-tool' onClick={onClick || handleAddNewTodo}>
      <AiOutlineFileDone
        className={`btn-tool-icon btn-todo ${additionalClassName}`}
      />
    </button>
  )
}

export default TodoForm
