import React from "react"
import "./Note-style.css"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import { PiScrollBold } from "react-icons/pi"
import { PiTriangleFill } from "react-icons/pi"
import { TbTriangleInvertedFilled } from "react-icons/tb"

import TodoForm from "../../Tools/TodoForm/TodoForm"

function Note({ noteContent }) {
  return (
    <div className='note'>
      <button className='btn-clear'>
        <TbTriangleInvertedFilled style={{ transform: "rotatez(270deg)" }} />
      </button>

      <div className='note-title'>fsdafdsa</div>
      <div className='note-extend'>
        <NoteForm additionalClassName='little-btn-tool-icon' />
        <TodoForm additionalClassName='little-btn-tool-icon' />
      </div>
      <div className='note-text'>{noteContent}</div>

      <div className='note-option'>
        <button className='btn-clear'>
          <PiScrollBold />
        </button>
      </div>
    </div>
  )
}

export default Note
