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

  const exeptions = {
    trashcan: "Corbeille est vide",
    favorites: "Liste de favori est vide",
  }

  return (
    <>
      {/* {isAddingNewNote ? <NewNote /> : null}
      {isAddingNewTodo ? <NewTodo /> : null}

      {Object.values(selectedCategory.content).length > 0 ? (
        Object.values(selectedCategory.content)
          .reverse()
          .map((item) => {
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
                todoDescription={item.todoDescription}
                nestedTodos={item.nestedTodos}
                isComplited={item.isComplited}
                showNestedTodos={item.showNestedTodos}
                path={item.path}
              />
            )
          })
      ) : exeptions.hasOwnProperty(selectedCategory.name) ? (
        <h3 style={{ marginTop: "20px" }}>
          {exeptions[selectedCategory.name]}
        </h3>
      ) : (
        <>
          <h3 style={{ marginTop: "20px" }}>
            {t("list is empty")}
            {".  "}
            <hr />
            {t("press")}
          </h3>
          <h5>
            <hr />
            <NoteForm />
            {t("to add a note and")}
            <hr />
            <TodoForm />
            {t("to add a todo")}
          </h5>
        </>
      )} */}
    </>
  )
}

export default ContentOfSelectedList
