import React from "react"
import { RxTriangleRight } from "react-icons/rx"

import "./Todo-style.css"
import TodoForm from "../../Tools/TodoForm/TodoForm"
import { GoBookmark } from "react-icons/go"
import { IoMdOptions } from "react-icons/io"
import { PiScrollThin } from "react-icons/pi"

function Todo({ level, title, content }) {
  return (
    <div className='todo'>
      <button className='btn-empty todo-wrap todo-part'>
        <RxTriangleRight style={{ transform: "scale(1.5)" }} />
      </button>

      <div className='todo-level todo-part'>1</div>

      <div className='todo-btn-extend todo-part'>
        {/* <NoteForm additionalClassName='little-btn-tool-icon' /> */}
        <TodoForm additionalClassName='little-btn-tool-icon' />
      </div>
      <div className='todo-check todo-part'>
        <input type='checkbox' />
      </div>

      <div className='todo-title todo-part'>
        <span className='todo-title-span'>{title}</span>
      </div>
      <div className='todo-text note-part'>
        <button className='btn-empty btn-todo-open'>
          <PiScrollThin />
        </button>
        <span className='todo-text-span'>status</span>
      </div>

      <div className='todo-option todo-part'>
        <button className='btn-empty'>
          <GoBookmark />
        </button>
        <button className='btn-empty'>
          <IoMdOptions />
        </button>
      </div>

      <div className='todo-tags todo-part'>tags</div>
    </div>
  )
}

export default Todo
