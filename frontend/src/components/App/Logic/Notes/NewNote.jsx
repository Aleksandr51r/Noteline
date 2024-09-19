import React, { useEffect, useRef, useState } from "react"
import "./Note-style.css"
import { useDispatch, useSelector } from "react-redux"
import {
  selectIsAddingNewNote,
  toggleAddingNewNestedNote,
  toggleAddingNewNote,
} from "../../../../redux/slices/contentSlice"
import { useTranslation } from "react-i18next"
import "./NewNote-style.css"
import Overlay from "../../../Overlay"
import { addNewNoteAsync } from "../../../../redux/ExtraReducers/NoteSliceExtraReducer"

function NewNote({ parentId, onClose, level, path }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAddingNewNote = useSelector(selectIsAddingNewNote)

  const choosenCategoryId = useSelector(
    (state) => state.content.selectedCategoryId
  )

  const [inputText, setInputText] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleInputText = (e) => {
    setInputText(e.target.value)
  }

  const closeAndClear = () => {
    setInputText("")
    if (parentId) {
      dispatch(toggleAddingNewNestedNote())
      onClose()
    } else {
      dispatch(toggleAddingNewNote())
    }
  }

  const handleAddNewNote = () => {
    if (inputText) {
      const text = inputText[0].toUpperCase() + inputText.slice(1)
      if (parentId) {
        dispatch(
          addNewNoteAsync({
            title: text,
            category: choosenCategoryId,
            parentId,
            level: ++level,
            path: path,
            parent_note: parentId,
            content: t("empty note"),
          })
        )
        dispatch(toggleAddingNewNestedNote())
        onClose()
      } else {
        dispatch(
          addNewNoteAsync({
            title: text,
            category: choosenCategoryId,
            path,
            content: t("empty note"),
          })
        )
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
      <div className='note-level note-part'></div>
      <div className='note-btn-extend note-part'></div>
      <div className='note-title note-part add-new-note'>
        <Overlay className={`overlay `} onClick={closeAndClear} />
        <input
          ref={inputRef}
          type='text'
          placeholder={t("title")}
          value={inputText}
          onChange={(e) => handleInputText(e)}
          className='input-title-note'
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className='note-text note-part note-text-btn'>
        <button
          className='btn-standart note-part btn-add-note'
          onClick={handleAddNewNote}
        >
          {t("add")}
        </button>
        <span className='note-text-span'></span>
      </div>
      <div className='note-option note-part'></div>

      <div className='note-tags note-part'></div>
    </div>
  )
}

export default NewNote
