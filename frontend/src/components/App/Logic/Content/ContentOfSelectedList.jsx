import React, { useState } from "react"
import {
  selectSelectedCategory,
  selectIsAddingNewNote,
  selectIsAddingNewTodo,
} from "../../../../redux/slices/contentSlice"
import { useSelector } from "react-redux"
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

  return (
    <>
      {isAddingNewNote ? <NewNote /> : null}
      {isAddingNewTodo ? <NewTodo /> : null}
      {selectedCategory.content.length > 0 ? (
        selectedCategory.content.map((item) =>
          item.type === "note" ? (
            <Note
              key={item.id}
              level={item.level}
              title={item.title}
              content={item.noteContent}
            />
          ) : (
            <Todo
              key={item.id}
              level={item.level}
              title={item.title}
              content={item.noteContent}
              isComplited = {item.isComplited}
            />
          )
        )
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
