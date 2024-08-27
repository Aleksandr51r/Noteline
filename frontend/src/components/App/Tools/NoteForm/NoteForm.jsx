import React from "react"
import { GiNotebook } from "react-icons/gi"
import "../Tools-style.css"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSelectedCategory,
  toggleAddingNewNote,
} from "../../../../redux/slices/contentSlice"

function NoteForm({ additionalClassName = "", onClick = null }) {
  const dispatch = useDispatch()

  const handleAddNewNote = () => {
    dispatch(toggleAddingNewNote())
  }

  return (
    <button className='btn-tool' onClick={onClick || handleAddNewNote}>
      <GiNotebook className={`btn-tool-icon btn-note ${additionalClassName}`} />
    </button>
  )
}

export default NoteForm
