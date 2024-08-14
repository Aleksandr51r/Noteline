import React, { useEffect, useRef, useState } from "react"
import "./Note-style.css"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSelectedCategory,
  selectIsAddingNewNote,
  toggleAddingNewNote,
  addNewNote,
} from "../../../../redux/slices/contentSlice"
import { useTranslation } from "react-i18next"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import { PiScrollBold } from "react-icons/pi"
import { RxTriangleRight } from "react-icons/rx"
import TodoForm from "../../Tools/TodoForm/TodoForm"
import "./NewNote-style.css"

import Note from "./Note"
import { PiTriangleFill } from "react-icons/pi"
import { TbTriangleInvertedFilled } from "react-icons/tb"

function NewNote() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const selectedCategory = useSelector(selectSelectedCategory)
  const isAddingNewNote = useSelector(selectIsAddingNewNote)

  const [inputText, setInputText] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    // Фокусируемся на input, если мы добавляем новую заметку
    if (isAddingNewNote && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAddingNewNote])

  const handleInputText = (e) => {
    setInputText(e.target.value)
  }

  const closeAndClear = () => {
    setInputText("")
    dispatch(toggleAddingNewNote())
  }

  const handleAddNewNote = () => {
    if (inputText) {
      console.log("inputText", inputText)
      dispatch(addNewNote(inputText))
      setInputText("")
      dispatch(toggleAddingNewNote())
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
    <div className='note'>
      <button className='btn-empty note-wrap note-part'>
        <RxTriangleRight style={{ transform: "scale(1.5)" }} />
      </button>
      <div className='note-level note-part'>1</div>
      <div className='note-color note-part'>Color</div>

      <div className='note-btn-extend note-part'>
        <NoteForm additionalClassName='little-btn-tool-icon' />
        <TodoForm additionalClassName='little-btn-tool-icon' />
      </div>
      <div className='note-title note-part'>
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
      <div className='note-text note-part'></div>

      <div className='note-option note-part'>
        <button className='btn-empty note-part btn-note-open'>
          <PiScrollBold />
        </button>
      </div>
      <div className='note-status note-part'>status</div>
      <div className='note-tags note-part'>tags</div>
    </div>
  )
}

export default NewNote
