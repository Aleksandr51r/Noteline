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
  level,
  title,
  noteContent,
  nestedNotes,
  showNestedNotes,
  path,
}) {
  const dispatch = useDispatch()
  const [areNestedNotesVisible, setAreNestedNotesVisible] =
    useState(showNestedNotes)
  const [thatNoteSelected, setThatNoteSelected] = useState(false)
  const isAddingNewNestedNote = useSelector(selectIsAddingNewNestedNote)
  const romeDigitsLevel = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
  }
  // const nestedNotes = Object.values(nestedNotes)
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

  const isHiddenTriangeOfWrapp = Object.values(nestedNotes).length > 0

  return (
    <div className='note-main'>
      <div
        className={`note note-static ${
          areNestedNotesVisible ? "expanded" : "note-hidden"
        }`}
      >
        <button
          className={`btn-empty note-wrap note-part ${
            isHiddenTriangeOfWrapp ? "wrap-expanded" : "wrap-hidden"
          }`}
          onClick={handleToggleNestedNotes}
        >
          <RxTriangleRight
            className={`note-wrap ${
              areNestedNotesVisible ? "wrap-expanded" : "note-hidden"
            }`}
          />
        </button>
        <div className='note-level note-part'>{romeDigitsLevel[level]}</div>

        <div
          className={`note-btn-extend note-part ${level <= 9 ? "" : "hidden"}`}
        >
          <NoteForm
            additionalClassName='little-btn-tool-icon'
            onClick={handleNoteFormClick}
          />
          {/* <TodoForm additionalClassName='little-btn-tool-icon' /> */}
        </div>
        <div className='note-dummy note-part '></div>

        <div
          className='note-title note-part '
          onClick={handleToggleNestedNotes}
        >
          <span className='note-title-span'>{title}</span>
        </div>

        <div className='note-text note-part'>
          <button className='btn-empty btn-note-open'>
            <PiScrollThin />
          </button>
          <span className='note-text-span'>{noteContent}</span>
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
          <NewNote parentPath={path} onClose={onClose} />
        ) : null}
        <div
          className={`notes-list ${areNestedNotesVisible ? "expanded" : ""}`}
        >
          {Object.values(nestedNotes).length > 0 &&
            areNestedNotesVisible &&
            Object.values(nestedNotes).reverse().map((item) => (
              <Note
                id={item.id}
                key={item.id}
                level={item.level}
                title={item.title}
                noteContent={item.noteContent}
                nestedNotes={item.nestedNotes}
                showNestedNotes={item.showNestedNotes}
                path={item.path}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Note
