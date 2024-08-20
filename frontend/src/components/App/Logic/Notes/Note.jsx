import React, { useState } from "react"
import "./Note-style.css"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import { PiScrollBold } from "react-icons/pi"
import { RxTriangleRight } from "react-icons/rx"
import { GoBookmark } from "react-icons/go"
import { MdOpenInFull } from "react-icons/md"
import { IoMdOptions } from "react-icons/io"
import { PiScrollThin } from "react-icons/pi"
import TodoForm from "../../Tools/TodoForm/TodoForm"
import { AiFillTags } from "react-icons/ai"

import { useDispatch, useSelector } from "react-redux"
import {
  selectIsAddingNewNote,
  toggleAddingNewNote,
  toggleAddingNewNestedNote,
  selectIsAddingNewNestedNote,
} from "../../../../redux/slices/contentSlice"
import NewNote from "./NewNote"

function Note({
  id,
  title,
  content,
  level,
  nestedNotes,
  showNestedNotes,
  onClick,
}) {
  const dispatch = useDispatch()
  const isAddingNewNestedNote = useSelector(selectIsAddingNewNestedNote)

  const [thatNoteSelected, setThatNoteSelected] = useState(false)
  const [areNestedNotesVisible, setAreNestedNotesVisible] =
    useState(showNestedNotes)

  const onClose = () => {
    setThatNoteSelected(false)
  }

  const handleNoteFormClick = () => {
    setThatNoteSelected(true)
    dispatch(toggleAddingNewNestedNote())
  }
  const handleToggleNestedNotes = () => {
    setAreNestedNotesVisible(!areNestedNotesVisible)
  }

  return (
    <div className='note-main'>
      <div className={`note ${areNestedNotesVisible ? "expanded" : "note-hidden"}`}>
        <button
          className='btn-empty note-wrap note-part'
          onClick={handleToggleNestedNotes}
        >
          <RxTriangleRight style={{ transform: "scale(1.5)" }} />
        </button>
        <div className='note-level note-part'>{level}</div>

        <div className='note-btn-extend note-part'>
          <NoteForm
            additionalClassName='little-btn-tool-icon'
            onClick={handleNoteFormClick}
          />
          {/* <TodoForm additionalClassName='little-btn-tool-icon' /> */}
        </div>
        <div className='note-dummy note-part '></div>
        <div className='note-title note-part'>
          <span className='note-title-span'>{title}</span>
        </div>
        <div className='note-text note-part'>
          <button className='btn-empty btn-note-open'>
            <PiScrollThin />
          </button>
          <span className='note-text-span'>{content}</span>
        </div>

        <div className='note-option note-part'>
          <button className='btn-empty '>
            <GoBookmark />
          </button>
          <button className='btn-empty '>
            <IoMdOptions />
          </button>
        </div>

        <div className='note-tags note-part'>
          <button className='btn-empty '>
            <AiFillTags />
          </button>
        </div>
      </div>
      <div
        className={`notes-nested ${areNestedNotesVisible ? "expanded" : ""}`}
      >
        {isAddingNewNestedNote && thatNoteSelected ? (
          <NewNote parentId={id} onClose={onClose} />
        ) : null}
        <div
          className={`notes-list ${areNestedNotesVisible ? "expanded" : ""}`}
        >
          {nestedNotes.length > 0 &&
            areNestedNotesVisible &&
            nestedNotes.map((nonested) => (
              <Note
                key={nonested.id}
                id={nonested.id}
                title={nonested.title}
                content={nonested.content}
                level={nonested.level}
                nestedNotes={nonested.nestedNotes}
                showNestedNotes={nonested.showNestedNotes}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Note
