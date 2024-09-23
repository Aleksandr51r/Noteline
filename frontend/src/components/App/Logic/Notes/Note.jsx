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
  toggleAddingNewNote,
  selectIsAddingNewNestedNote,
  selectSelectedCategory,
  selectIsAddingNewNote,
} from "../../../../redux/slices/contentSlice"
import NewNote from "./NewNote"
import ExtendedNote from "./ExtendedNote"
import {
  toggleShowNestedAsync,
  addNoteToFavoriteAsync,
} from "../../../../redux/ExtraReducers/NoteSliceExtraReducer"
import NoteSettings from "./NoteSettings"
import { selectFilterContent } from "../../../../redux/slices/filterSlice"
import ReactMarkdown from "react-markdown"

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
  const [isSettingsNoteOpen, setIsSettingsNoteOpen] = useState(false)
  const [thatNoteSelected, setThatNoteSelected] = useState(false)
  const isAddingNewNestedNote = useSelector(selectIsAddingNewNestedNote)
  const selectedCategory = useSelector(selectSelectedCategory)
  const filterContent = useSelector(selectFilterContent)

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
  const highlightMatch = (text, filter) => {
    if (!filter) return text
    const regex = new RegExp(`(${filter})`, "gi")

    console.log("text.split(regex)", text.split(regex))

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className='highlight'>
            {substring}
          </span>
        )
      }
      return substring
    })
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
    setIsFavorite(!isFavorite)
  }

  const isHiddenTriangeOfWrapp =
    nestedNotes && Object.keys(nestedNotes).length > 0

  const closeAndClear = () => {
    setIsNoteOpen(false)
  }

  const handleNoteOpen = () => {
    setIsSettingsNoteOpen(true)
  }

  const closeOverlaySettings = () => {
    setIsSettingsNoteOpen(false)
  }

  return (
    <>
      {/* EXTENDED NOTE */}
      {isNoteOpen && (
        <ExtendedNote
          onClick={closeAndClear}
          title={title}
          content={noteContent}
          path={path}
          id={id}
        />
      )}

      {/*  NOTE LINE */}
      <div className={`note-main ${className ? className : ""}`}>
        {isSettingsNoteOpen ? (
          <NoteSettings
            title={title}
            id={id}
            path={path}
            closeOverlaySettings={closeOverlaySettings}
          />
        ) : (
          <div
            className={`note note-in-list ${
              areNestedNotesVisible ? "expanded" : "note-hidden"
            }`}
          >
            <div className='note-wrap note-part'>
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
              {is_favorite && selectedCategory.name === "favorites"
                ? null
                : romeDigitsLevel[level]}
            </div>

            <div
              className={`note-btn-extend note-part ${
                level <= 9 ? "" : "hidden"
              }`}
            >
              {is_favorite && selectedCategory.name === "favorites" ? null : (
                <NoteForm
                  additionalClassName='little-btn-tool-icon'
                  onClick={handleNoteFormClick}
                />
              )}
            </div>
            <div className='note-title note-part '>
              <span className='note-title-span'>
                {highlightMatch(title, filterContent)}
              </span>
            </div>

            <div
              className='note-text note-part note-part-open'
              onClick={handleAddNoteContent}
            >
              <ReactMarkdown className='markdown'>
                {noteContent ? noteContent.slice(0, 15) + "..." : ""}
              </ReactMarkdown>
            </div>

            <div className='note-option note-part'>
              <button className='btn-empty ' onClick={handleAddNoteInFavorite}>
                {isFavorite ? (
                  <FaBookmark className='isFavorite-filled' />
                ) : (
                  <FaRegBookmark />
                )}
              </button>
              <button className='btn-empty ' onClick={handleNoteOpen}>
                {is_favorite && selectedCategory.name === "favorites" ? null : (
                  <IoMdOptions />
                )}
              </button>

            </div>
          </div>
        )}

        <div
          className={`notes-nested ${areNestedNotesVisible ? "expanded" : ""}`}
        >
          {isAddingNewNestedNote && thatNoteSelected ? (
            <NewNote
              onClose={onClose}
              parentId={id}
              level={level}
              path={[...path, id]} //     ADDING A NEW PATH TO NOTE PATH DIRECTION
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
                      noteContent={item.content}
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
