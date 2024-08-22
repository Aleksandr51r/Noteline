import React, { useState } from "react"
import {
  selectSelectedCategory,
  selectIsAddingNewNote,
  selectIsAddingNewTodo,
  toggleAddingNewNote,
} from "../../../../redux/slices/contentSlice"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Note from "../Notes/Note"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import TodoForm from "../../Tools/TodoForm/TodoForm"
import NewNote from "../Notes/NewNote"
import Todo from "../Todos/Todo"
import NewTodo from "../Todos/NewTodo"

function ContentOfSelectedList() {
  const selectedCategory = useSelector(selectSelectedCategory)
  const isAddingNewNote = useSelector(selectIsAddingNewNote)
  const isAddingNewTodo = useSelector(selectIsAddingNewTodo)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <>
      {isAddingNewNote ? <NewNote /> : null}
      {isAddingNewTodo ? <NewTodo /> : null}

      {Object.values(selectedCategory.content).length > 0 ? (
        Object.values(selectedCategory.content).reverse().map((item) => {
          return item.type === "note" ? (
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
          ) : (
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
          )
        })
      ) : selectedCategory.name === "trashcan" ? (
        <h3 style={{ marginTop: "40px" }}>Corbeille est vide</h3>
      ) : (
        <h3 style={{ marginTop: "40px" }}>
          {t("list is empty")}
          {".  "}
          {t("press")}
          <hr />
          <NoteForm />
          {t("to add a note and")}
          <hr />
          <TodoForm />
          {t("to add a todo")}
        </h3>
      )}
    </>
  )
}

export default ContentOfSelectedList
