import React from "react"
import { GiNotebook } from "react-icons/gi"
import "../Tools-style.css"
import { useDispatch } from "react-redux"
import { toggleAddingNewNote } from "../../../../redux/slices/contentSlice"

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
