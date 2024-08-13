import React from "react"
import "./Note-style.css"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import { PiScrollBold } from "react-icons/pi"
import { PiTriangleFill } from "react-icons/pi"
import { TbTriangleInvertedFilled } from "react-icons/tb"
import { RxTriangleRight } from "react-icons/rx"

import TodoForm from "../../Tools/TodoForm/TodoForm"

function Note({ noteTitle = "title", noteContent }) {
  return (
    <div className='note'>
      <button className='btn-empty note-wrap note-part'>
        <RxTriangleRight style={{ transform: "scale(1.5)" }} />
      </button>
      <div className='note-first note-part'></div>

      <div className='note-btn-extend note-part'>
        <NoteForm additionalClassName='little-btn-tool-icon' />
        <TodoForm additionalClassName='little-btn-tool-icon' />
      </div>
      <div className='note-title note-part'>{noteTitle}</div>
      <div className='note-text note-part'>{noteContent}</div>

      <div className='note-option note-part'>
        <button className='btn-empty note-part btn-note-open'>
          <PiScrollBold />
        </button>
      </div>
      <div className='note-status note-part'>status</div>
      <div className='note-tags note-part'>tags</div>
    </div>
  )
}

export default Note
