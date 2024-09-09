import React, { useEffect, useRef, useState } from "react"
import "./Todo-style.css"
import {
  selectIsAddingNewTodo,
  selectIsAddingNewNestedTodo,
  toggleAddingNewTodo,
  toggleAddingNewNestedTodo,
  addNewTodo,
  addNestedTodo,
} from "../../../../redux/slices/contentSlice"
import "./NewTodo-style.css"
import Overlay from "../../../Overlay"


import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

function NewTodo({ parentPath = null, onClose }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAddingNewTodo = useSelector(selectIsAddingNewTodo)
  const isAddingNewNestedTodo = useSelector(selectIsAddingNewNestedTodo)

  const [inputText, setInputText] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (isAddingNewTodo || (isAddingNewNestedTodo && inputRef.current)) {
      inputRef.current.focus()
    }
  }, [isAddingNewTodo, isAddingNewNestedTodo])

  const handleInputText = (e) => {
    setInputText(e.target.value)
  }

  const closeAndClear = () => {
    setInputText("")
    if (parentPath) {
      dispatch(toggleAddingNewNestedTodo())
      onClose()
    } else {
      dispatch(addNewTodo(inputText))
      dispatch(toggleAddingNewTodo())
    }
  }

  const handleAddNewTodo = () => {
    if (inputText) {
      if (parentPath) {
        dispatch(addNestedTodo({ title: inputText, parentPath }))
        dispatch(toggleAddingNewNestedTodo())
        onClose()
      } else {
        dispatch(addNewTodo(inputText))
        dispatch(toggleAddingNewTodo())
      }
      setInputText("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNewTodo()
    } else if (e.key === "Escape") {
      closeAndClear()
    }
  }

  return (
    <div className='todo new-todo'>
      <button className='btn-empty todo-wrap todo-part'>
      </button>

      <div className='todo-level todo-part'></div>

      <div className='todo-btn-extend todo-part'>
      </div>
      <div className='todo-check todo-part'>
        <input type='checkbox' />
      </div>

      <div className='todo-title todo-part add-new-todo'>
        <Overlay onClick={closeAndClear}/>
      

        <input
          ref={inputRef}
          type='text'
          placeholder={t("title")}
          value={inputText}
          onChange={(e) => handleInputText(e)}
          className='input-title-todo'
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className='todo-text todo-part'>
        <button
          className='btn-standart todo-part btn-add-todo'
          onClick={handleAddNewTodo}
        >
          {t("add")}
        </button>
        <span className='todo-text-span'></span>
      </div>

      <div className='todo-option todo-part'>
      </div>

      <div className='todo-tags todo-part'></div>
    </div>
  )
}

export default NewTodo
