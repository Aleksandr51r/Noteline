import React, { useEffect, useState } from "react"
import {
  selectSelectedCategory,
  selectIsAddingNewNote,
  selectIsAddingNewTodo,
  toggleAddingNewNote,
  selectContentList,
  selectNotes,
  handleAllNotesForNestedNote,
} from "../../../../redux/slices/contentSlice"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Note from "../Notes/Note"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import TodoForm from "../../Tools/TodoForm/TodoForm"
import NewNote from "../Notes/NewNote"
import Todo from "../Todos/Todo"
import NewTodo from "../Todos/NewTodo"
import { fetchNotes } from "../../../../redux/ExtraReducers/NoteSliceExtraReducer"

function ContentOfSelectedList() {
  const isAddingNewNote = useSelector(selectIsAddingNewNote)
  const isAddingNewTodo = useSelector(selectIsAddingNewTodo)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const allCategories = useSelector(selectContentList)
  const choosenCategoryId = useSelector(
    (state) => state.content.selectedCategoryId
  )
  const Notes = useSelector(selectNotes)
  // console.log("Notes", Notes)

  const exeptions = {
    trashcan: "Corbeille est vide",
    favorites: "Liste de favori est vide",
  }
  const selectedCategory = useSelector(selectSelectedCategory)
  const choosenCategory = useSelector(selectSelectedCategory)
  console.log("selectedCategory", selectedCategory)
  console.log("choosenCategory", choosenCategory)
  console.log("allCategories", allCategories)
  console.log("choosenCategoryId", choosenCategoryId)
  console.log(
    "allCategories[choosenCategoryId]",
    allCategories[choosenCategoryId]
  )

  useEffect(() => {
    dispatch(fetchNotes())
    dispatch(handleAllNotesForNestedNote())
  }, [dispatch])

  return (
    <>
      {isAddingNewNote ? <NewNote /> : null}
      {isAddingNewTodo ? <NewTodo /> : null}

      {selectedCategory && Object.keys(selectedCategory.content).length > 0 ? (
        Object.keys(selectedCategory.content)
          .reverse()
          .map((item) => {
            return (
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
            )
          })
      ) : exeptions.hasOwnProperty(
          selectedCategory && selectedCategory.name
        ) ? (
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
      )}
    </>
  )
}

export default ContentOfSelectedList

// return item.type === "note" ? (
//   <Note
//     id={item.id}
//     key={item.id}
//     level={item.level}
//     title={item.title}
//     noteContent={item.noteContent}
//     nestedNotes={item.nestedNotes}
//     showNestedNotes={item.showNestedNotes}
//     path={item.path}
//   />
// ) : (
//   <Todo
//     id={item.id}
//     key={item.id}
//     level={item.level}
//     title={item.title}
//     todoDescription={item.todoDescription}
//     nestedTodos={item.nestedTodos}
//     isComplited={item.isComplited}
//     showNestedTodos={item.showNestedTodos}
//     path={item.path}
//   />
// )
