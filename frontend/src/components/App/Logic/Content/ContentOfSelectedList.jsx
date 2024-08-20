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
  const [selectedNoteId, setSelectedNoteId] = useState(null)

  const handleAddNestedNote = (noteId) => {
    setSelectedNoteId(noteId)
    console.log("hhhhhhhhhhhhhhh")
  }

  return (
    <>
      {isAddingNewNote ? <NewNote /> : null}
      {isAddingNewTodo ? <NewTodo /> : null}
      {selectedCategory.content.length > 0 ? (
        selectedCategory.content.map((item) =>
          item.type === "note" ? (
            <Note
              id={item.id}
              key={item.id}
              level={item.level}
              title={item.title}
              content={item.noteContent}
              onClick={() => handleAddNestedNote(item.id)}
              nestedNotes={item.nestedNotes}
              showNestedNotes={item.showNestedNotes}
            />
          ) : (
            <Todo
              key={item.id}
              level={item.level}
              title={item.title}
              content={item.noteContent}
              isComplited={item.isComplited}
            />
          )
        )
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
