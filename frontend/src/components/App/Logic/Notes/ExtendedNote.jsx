import React, { useState } from "react"
import "./ExtendedNote-style.css"
import { useTranslation } from "react-i18next"
import { HiPencilSquare } from "react-icons/hi2"
import Overlay from "../../../Overlay"
import TextEditor from "../../TextEditor/TextEditor"
import { useDispatch } from "react-redux"
import { modifyNote } from "../../../../redux/slices/contentSlice"

function ExtendedNote({ onClick, title, content, tags, path, id }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [isRedacting, isReducting] = useState(false)
  const [titles, setTitle] = useState(title)
  const [noteContent, setNoteContent] = useState(content)

  const handleReductingNote = () => {
    isReducting(true)
  }

  const handleClickInRedactingMode = () => {
    isReducting(false)
    console.log("path", noteContent)
    console.log("path", path)
    dispatch(modifyNote({ path, noteContent, id }))
  }

  return (
    <>
      <Overlay
        onClick={isRedacting ? handleClickInRedactingMode : onClick}
        addedClassName={`${isRedacting ? "levelHigher" : ""}`}
      />

      {!isRedacting ? (
        <div className='opened-note'>
          <h2 className='extended-note-title'>{titles}</h2>

          <div className='extended-note-control-panel'>
            <button className='btn-empty btn-reduct'>
              <HiPencilSquare
                className='btn-reduct-icon'
                onClick={handleReductingNote}
              />
            </button>
          </div>

          <div
            className='extended-note-content'
            dangerouslySetInnerHTML={{ __html: noteContent }}
          ></div>
          <div className='extended-note-tags'>{tags}</div>
        </div>
      ) : (
        <div className='opened-note'>
          <h2 className='extended-note-title'>{title}</h2>
          <TextEditor
            className='extended-note-content-textarea'
            content={noteContent}
            onChange={setNoteContent}
          />

          <div className='extended-note-tags'>
            {tags}
            <button className='btn-empty'></button>
          </div>
        </div>
      )}
    </>
  )
}

export default ExtendedNote
