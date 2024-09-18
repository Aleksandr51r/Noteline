import React, { useEffect, useRef, useState } from "react"
import "./NoteSettings-style.css"
import Overlay from "../../../Overlay"
import { IoClose } from "react-icons/io5"
import { FaCheckSquare } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import {
  modifyNameNoteAsync,
  deleteNoteAsync,
} from "../../../../redux/ExtraReducers/NoteSliceExtraReducer"
import { useDispatch } from "react-redux"

function NoteSettings({ title, id, path, closeOverlaySettings, category }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const [settingsTitle, setTitle] = useState(title)
  const [isDeletingNote, setIsDeletingNote] = useState(false)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleOverlayClick = () => {
    dispatch(modifyNameNoteAsync({ id, path, title: settingsTitle }))
    closeOverlaySettings()
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOverlayClick()
    } else if (e.key === "Escape") {
      isDeletingNote ? setIsDeletingNote(false) : closeOverlaySettings()
    }
  }

  const handleDeleteNote = () => {
    dispatch(deleteNoteAsync({ id, path }))
    closeOverlaySettings()
  }
  const switchIsDeletingNote = () => {
    setIsDeletingNote(!isDeletingNote)
  }

  return (
    <>
      <Overlay
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        addedClassName={`${isDeletingNote ? "levelHigher" : ""}`}
      />

      <div className='test-note-settings-wrap'>
        <div className='test-note-settings'>
          {isDeletingNote ? (
            <>
              <button className='btn-empty' onClick={handleDeleteNote}>
                <FaCheckSquare style={{ color: "red" }} />
              </button>
              <button className='btn-empty' onClick={switchIsDeletingNote}>
                <IoClose />
              </button>
            </>
          ) : (
            <>
              <input
                value={settingsTitle}
                onChange={(e) => setTitle(e.target.value)}
                className='note-input-settings-title'
                onKeyDown={handleKeyDown}
              />
              <div></div>
              <button className='btn-empty' onClick={switchIsDeletingNote}>
                <span className='trashcan'>{t("delete note")}</span>
              </button>
            </>
          )}
        </div>
        {isDeletingNote ? (
          <span className='delete-note-warning'>
            {t("It will delete all nested notes")}
          </span>
        ) : null}
      </div>
    </>
  )
}

export default NoteSettings
