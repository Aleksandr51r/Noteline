import React, { useEffect, useRef, useState } from "react"
import "./Note-style.css"
import { useDispatch, useSelector } from "react-redux"
import {

  selectIsAddingNewNote,
  selectIsAddingNewNestedNote,
  toggleAddingNewNote,
  toggleAddingNewNestedNote,
  addNewNote,
  addNestedNote,
} from "../../../../redux/slices/contentSlice"
import { useTranslation } from "react-i18next"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import { RxTriangleRight } from "react-icons/rx"
import TodoForm from "../../Tools/TodoForm/TodoForm"
import "./NewNote-style.css"
import { MdAddBox } from "react-icons/md"
import { GoBookmark } from "react-icons/go"
import { IoMdOptions } from "react-icons/io"
import { PiScrollThin } from "react-icons/pi"

function NewNote({ parentPath = null, onClose }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAddingNewNote = useSelector(selectIsAddingNewNote)
  const isAddingNewNestedNote = useSelector(selectIsAddingNewNestedNote)

  const [inputText, setInputText] = useState("")
  const inputRef = useRef(null)
  useEffect(() => {
    if (isAddingNewNote || (isAddingNewNestedNote && inputRef.current)) {
      inputRef.current.focus()
    }
  }, [isAddingNewNote])

  const handleInputText = (e) => {
    setInputText(e.target.value)
  }

  const closeAndClear = () => {
    setInputText("")
    if (parentPath) {
      dispatch(toggleAddingNewNestedNote())
      onClose()
    } else {
      dispatch(toggleAddingNewNote())
    }
  }

  const handleAddNewNote = () => {
    if (inputText) {
      if (parentPath) {
        dispatch(addNestedNote({ title: inputText, parentPath }))
        dispatch(toggleAddingNewNestedNote())
        onClose()
      } else {
        dispatch(addNewNote(inputText))
        dispatch(toggleAddingNewNote())
      }
      setInputText("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNewNote()
    } else if (e.key === "Escape") {
      closeAndClear()
    }
  }

  return (
    <div className='note new-note'>
      <button className='btn-empty note-wrap note-part'>
        <RxTriangleRight style={{ transform: "scale(1.5)" }} />
      </button>
      <div className='note-level note-part'>1</div>

      <div className='note-btn-extend note-part'>
        <NoteForm additionalClassName='little-btn-tool-icon' />
      </div>

      <div className='note-title note-part add-new-note'>
        <div
          className={`overlay ${
            isAddingNewNote ? "open" : "closed"
          } overlay-for-note-title`}
          onClick={closeAndClear}
        ></div>

        <input
          ref={inputRef}
          type='text'
          placeholder={t("Title")}
          value={inputText}
          onChange={(e) => handleInputText(e)}
          className='input-title-note'
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className='note-text note-part '>
        <button
          className='btn-standart note-part btn-add-note'
          onClick={handleAddNewNote}
        >
          {t("add")}
        </button>
        <span className='note-text-span'></span>
      </div>

      <div className='note-option note-part'>
        <button className='btn-empty  note-part'>
          <GoBookmark />
        </button>
        <button className='btn-empty note-part'>
          <IoMdOptions />
        </button>
      </div>

      <div className='note-tags note-part'>tags</div>
    </div>
  )
}

export default NewNote
