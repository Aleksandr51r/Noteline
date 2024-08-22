import React, { useState } from "react"
import { RxTriangleRight } from "react-icons/rx"
import "./Todo-style.css"
import TodoForm from "../../Tools/TodoForm/TodoForm"
import { GoBookmark } from "react-icons/go"
import { IoMdOptions } from "react-icons/io"
import { PiScrollThin } from "react-icons/pi"
import { v4 as uuidv4 } from "uuid"
import {
  toggleAddingNewNestedTodo,
  selectIsAddingNewNestedTodo,
} from "../../../../redux/slices/contentSlice"
import { useDispatch, useSelector } from "react-redux"
import NewTodo from "./NewTodo"

function Todo({
  level,
  title,
  todoPresicion,
  nestedTodos,
  showNestedTodos,
  path,
  isComplited,
}) {
  const dispatch = useDispatch()
  const [areNestedTodoVisible, setAreNestedTodoVisible] = useState(false)
  const [thatTodoSelected, setThatTodoSelected] = useState(showNestedTodos)
  const [isCompleted, setIsComplited] = useState(isComplited)
  const isAddingNewNestedTodo = useSelector(selectIsAddingNewNestedTodo)
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
    setThatTodoSelected(false)
  }
  const handleComplitedTask = () => {
    setIsComplited(!isCompleted)
  }

  const handleTodoFormClick = () => {
    setThatTodoSelected(true)
    dispatch(toggleAddingNewNestedTodo())
  }
  const handleToggleNestedTodos = () => {
    setAreNestedTodoVisible(!areNestedTodoVisible)
  }

  const isHiddenTriangeOfWrapp = Object.values(nestedTodos).length > 0
  const checkBoxId = `_checkbox_${uuidv4()}`

  return (
    <div className='todo-main'>
      <div className={`todo ${isCompleted ? "finished" : ""} todo-static`}>
        <button
          className={`btn-empty todo-wrap todo-part ${
            isHiddenTriangeOfWrapp ? "wrap-expanded" : "wrap-hidden"
          }`}
          onClick={handleToggleNestedTodos}
        >
          <RxTriangleRight
            className={`todo-wrap ${
              areNestedTodoVisible ? "wrap-expanded" : "note-hidden"
            }`}
          />
        </button>

        <div className='todo-level todo-part'>{romeDigitsLevel[level]}</div>

        <div className='todo-btn-extend todo-part'>
          {/* <NoteForm additionalClassName='little-btn-tool-icon' /> */}
          <TodoForm
            additionalClassName='little-btn-tool-icon'
            onClick={handleTodoFormClick}
          />
        </div>
        <div class='checkbox-wrapper-26 todo-checkbox todo-part'>
          <input
            type='checkbox'
            id={checkBoxId}
            onChange={handleComplitedTask}
          />
          <label for={checkBoxId}>
            <div class='tick_mark'></div>
          </label>
        </div>

        <div className='todo-title todo-part' onClick={handleToggleNestedTodos}>
          <span className='todo-title-span'>{title}</span>
        </div>
        <div className='todo-text note-part'>
          {todoPresicion}
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

      <div className={`todo-nested ${areNestedTodoVisible ? "expanded" : ""}`}>
        {isAddingNewNestedTodo && thatTodoSelected ? (
          <NewTodo parentPath={path} onClose={onClose} />
        ) : null}
        <div className='todo-list'>
          {Object.values(nestedTodos).length > 0 &&
            areNestedTodoVisible &&
            Object.values(nestedTodos)
              .reverse()
              .map((item) => (
                <Todo
                  id={item.id}
                  key={item.id}
                  level={item.level}
                  title={item.title}
                  todoPresicion={item.todoPresicion}
                  nestedTodos={item.nestedTodos}
                  isComplited={item.isComplited}
                  showNestedTodos={item.showNestedTodos}
                  path={item.path}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

export default Todo
