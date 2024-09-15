import React, { useState } from "react"
import "./Note-style.css"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import { RxTriangleRight } from "react-icons/rx"
import { FaBookmark } from "react-icons/fa6"
import { FaRegBookmark } from "react-icons/fa6"
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
import {
  toggleShowNestedAsync,
  addNoteToFavoriteAsync,
} from "../../../../redux/ExtraReducers/NoteSliceExtraReducer"

function Note({
  id,
  level,
  title,
  noteContent,
  nestedNotes,
  show_nested_notes,
  path,
  className,
  is_favorite,
  parentId,
  isFavoriteNote = false,
}) {
  const dispatch = useDispatch()
  const [areNestedNotesVisible, setAreNestedNotesVisible] =
    useState(show_nested_notes)
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(is_favorite)
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

  const handleNoteFormClick = () => {
    setThatNoteSelected(true)
    dispatch(toggleAddingNewNestedNote())
  }
  const handleToggleNestedNotes = () => {
    setAreNestedNotesVisible(!areNestedNotesVisible)

    dispatch(
      toggleShowNestedAsync({ id, show_nested_notes: !areNestedNotesVisible })
    )
  }
  const handleAddNoteContent = () => {
    setIsNoteOpen(true)
  }
  const handleAddNoteInFavorite = () => {
    dispatch(addNoteToFavoriteAsync({ id, is_favorite: !isFavorite }))
    console.log(`note ${title}`, isFavorite)
    setIsFavorite(!isFavorite)
    console.log(`note ${title}`, isFavorite)
  }
  // console.log(`note ${title}`, isFavorite)

  const isHiddenTriangeOfWrapp =
    !is_favorite && nestedNotes && Object.keys(nestedNotes).length > 0

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
              {noteContent ? noteContent.slice(0, 15) + "..." : <ImPencil2 />}
            </span>
          </div>

          <div className='note-option note-part'>
            <button className='btn-empty ' onClick={handleAddNoteInFavorite}>
              {isFavorite ? (
                <FaBookmark className='isFavorite-filled' />
              ) : (
                <FaRegBookmark />
              )}
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
          {!isFavoriteNote && (
            <div
              className={`notes-list ${
                areNestedNotesVisible ? "expanded" : ""
              }`}
            >
              {nestedNotes &&
                Object.keys(nestedNotes).length > 0 &&
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
                      show_nested_notes={item.show_nested_notes}
                      path={item.path}
                      parentId={item.id}
                      is_favorite={item.is_favorite}
                    />
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Note
