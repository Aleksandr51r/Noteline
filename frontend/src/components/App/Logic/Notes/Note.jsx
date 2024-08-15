import React from "react"
import "./Note-style.css"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import { PiScrollBold } from "react-icons/pi"
import { RxTriangleRight } from "react-icons/rx"
import { GoBookmark } from "react-icons/go"
import { MdOpenInFull } from "react-icons/md"
import { IoMdOptions } from "react-icons/io"
import { PiScrollThin } from "react-icons/pi"

import TodoForm from "../../Tools/TodoForm/TodoForm"

function Note({ title, content, level }) {
  return (
    <div className='note'>
      <button className='btn-empty note-wrap note-part'>
        <RxTriangleRight style={{ transform: "scale(1.5)" }} />
      </button>
      <div className='note-level note-part'>{level}</div>

      <div className='note-btn-extend note-part'>
        <NoteForm additionalClassName='little-btn-tool-icon' />
        {/* <TodoForm additionalClassName='little-btn-tool-icon' /> */}
      </div>
      <div className="note-dummy note-part "></div>
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

      <div className='note-tags note-part'>tags</div>
    </div>
  )
}

export default Note
