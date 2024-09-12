import React, { useState } from "react"
import "./Note-style.css"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import { RxTriangleRight } from "react-icons/rx"
import { GoBookmark } from "react-icons/go"
import { IoMdOptions } from "react-icons/io"
import { AiFillTags } from "react-icons/ai"
import { ImPencil2 } from "react-icons/im"
import { useDispatch, useSelector } from "react-redux"
import {
  toggleAddingNewNestedNote,
  selectIsAddingNewNestedNote,
} from "../../../../redux/slices/contentSlice"
import NewNote from "./NewNote"
import ExtendedNote from "./ExtendedNote"

function Note({
  id,
  level,
  title,
  noteContent,
  nestedNotes,
  showNestedNotes,
  path,
  className,
  parentId,
}) {
  const dispatch = useDispatch()
  const [areNestedNotesVisible, setAreNestedNotesVisible] =
    useState(showNestedNotes)
  const [isNoteOpen, setIsNoteOpen] = useState(false)
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
  const onClose = () => {
    setThatNoteSelected(false)
  }
  /*
  const noteContent = ""
  const noteContent =
  "C’est sur les instances de M. le chevalier Trelawney, du docteur Livesey et de tous ces messieurs en général, que je me suis décidé à mettre par écrit tout ce que je sais concernant l’île au trésor, depuis A jusqu’à Z, sans rien excepter que la position de l’île, et cela uniquement parce qu’il s’y trouve toujours une partie du trésor. Je prends donc la plume en cet an de grâce 17..., et commence mon récit à l’époque où mon père tenait l’auberge de l’Amiral Benbow, en ce jour où le vieux marin, au visage basané et balafré d’un coup de sabre, vint prendre gîte sous notre toit. "
  */

  const handleNoteFormClick = () => {
    setThatNoteSelected(true)
    dispatch(toggleAddingNewNestedNote())
  }
  const handleToggleNestedNotes = () => {
    setAreNestedNotesVisible(!areNestedNotesVisible)
  }
  const handleAddNoteContent = () => {
    setIsNoteOpen(true)
  }

  const isHiddenTriangeOfWrapp = Object.keys(nestedNotes).length > 0
  const closeAndClear = () => {
    setIsNoteOpen(false)
  }

  return (
    <>
      {isNoteOpen && (
        <ExtendedNote
          onClick={closeAndClear}
          title={title}
          content={noteContent}
          path={path}
        />
      )}
      <div className={`note-main ${className ? className : ""}`}>
        <div
          className={`note note-in-list ${
            areNestedNotesVisible ? "expanded" : "note-hidden"
          }`}
        >
          <div className='note-wrap note-part'>
            <div className='note-dummy note-part '></div>
            <button
              className={`btn-empty note-wrap note-part ${
                isHiddenTriangeOfWrapp ? "wrap-note-expanded" : "wrap-hidden"
              }`}
              onClick={handleToggleNestedNotes}
            >
              <RxTriangleRight
                className={` ${
                  areNestedNotesVisible ? "wrap-expanded" : "note-hidden"
                }`}
              />
            </button>
          </div>
          <div
            className='note-level note-part'
            onClick={handleToggleNestedNotes}
          >
            {romeDigitsLevel[level]}
          </div>

          <div
            className={`note-btn-extend note-part ${
              level <= 9 ? "" : "hidden"
            }`}
          >
            <NoteForm
              additionalClassName='little-btn-tool-icon'
              onClick={handleNoteFormClick}
            />
            {/* <TodoForm additionalClassName='little-btn-tool-icon' /> */}
          </div>
          {/* <div className='note-dummy note-part '></div> */}

          <div className='note-title note-part '>
            <span className='note-title-span'>{title}</span>
          </div>

          <div
            className='note-text note-part note-part-open'
            onClick={handleAddNoteContent}
          >
            <span className='note-part-open-span'>
              {noteContent ? noteContent.slice(0, 25) + "..." : <ImPencil2 />}
            </span>
          </div>

          <div className='note-option note-part'>
            <button className='btn-empty '>
              <GoBookmark />
            </button>
            <button className='btn-empty '>
              <IoMdOptions />
            </button>
            <button className='btn-empty '>
              <AiFillTags />
            </button>
          </div>
        </div>

        <div
          className={`notes-nested ${areNestedNotesVisible ? "expanded" : ""}`}
        >
          {isAddingNewNestedNote && thatNoteSelected ? (
            <NewNote
              onClose={onClose}
              parentId={id}
              level={level}
              path={[...path, id]}
            />
          ) : null}
          <div
            className={`notes-list ${areNestedNotesVisible ? "expanded" : ""}`}
          >
            {Object.keys(nestedNotes).length > 0 &&
              areNestedNotesVisible &&
              Object.values(nestedNotes)
                .reverse()
                .map((item) => (
                  <Note
                    className='nestedItem'
                    id={item.id}
                    key={item.id}
                    level={item.level}
                    title={item.title}
                    noteContent={item.noteContent}
                    nestedNotes={item.nestedNotes}
                    showNestedNotes={item.showNestedNotes}
                    path={item.path}
                    parentId={item.id}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Note
