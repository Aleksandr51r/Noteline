import React, { useEffect, useRef, useState } from "react"
import { RxTriangleRight } from "react-icons/rx"
import "./Todo-style.css"
import {
  selectSelectedCategory,
  selectIsAddingNewTodo,
  toggleAddingNewTodo,
  addNewTodo,
} from "../../../../redux/slices/contentSlice"
import "./NewTodo-style.css"
import TodoForm from "../../Tools/TodoForm/TodoForm"
import { GoBookmark } from "react-icons/go"
import { IoMdOptions } from "react-icons/io"
import { PiScrollThin } from "react-icons/pi"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

function NewTodo() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAddingNewTodo = useSelector(selectIsAddingNewTodo)
  const [inputText, setInputText] = useState("")
  const inputRef = useRef(null)
  useEffect(() => {
    if (isAddingNewTodo && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAddingNewTodo])

  const handleInputText = (e) => {
    setInputText(e.target.value)
  }

  const closeAndClear = () => {
    setInputText("")
    dispatch(toggleAddingNewTodo())
  }

  const handleAddNewNote = () => {
    if (inputText) {
      dispatch(addNewTodo(inputText))
      setInputText("")
      dispatch(toggleAddingNewTodo())
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
    <div className='todo'>
      <button className='btn-empty todo-wrap todo-part'>
        <RxTriangleRight style={{ transform: "scale(1.5)" }} />
      </button>

      <div className='todo-level todo-part'>1</div>

      <div className='todo-btn-extend todo-part'>
        {/* <NoteForm additionalClassName='little-btn-tool-icon' /> */}
        <TodoForm additionalClassName='little-btn-tool-icon' />
      </div>
      <div className='todo-check todo-part'>
        <input type='checkbox' />
      </div>

      <div className='note-title note-part add-new-note'>
        <div
          className={`overlay ${
            isAddingNewTodo ? "open" : "closed"
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
      <div className='todo-text note-part'>
        <button
          className='btn-standart note-part btn-add-note'
          onClick={handleAddNewNote}
        >
          {t("add")}
        </button>
        <span className='todo-text-span'></span>
      </div>

      <div className='todo-option todo-part'>
        <button className='btn-empty'>
          <GoBookmark />
        </button>
        <button className='btn-empty'>
          <IoMdOptions />
        </button>
      </div>

      <div className='todo-tags todo-part'>tags</div>
    </div>
  )
}

export default NewTodo
