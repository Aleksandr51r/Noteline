import React, { useEffect } from "react"
import {
  selectSelectedCategory,
  selectIsAddingNewNote,
  selectIsAddingNewTodo,

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
import { selectFavoritesNotes } from "../../../../redux/slices/contentSlice"


function ContentOfSelectedList() {
  const isAddingNewNote = useSelector(selectIsAddingNewNote)
  const isAddingNewTodo = useSelector(selectIsAddingNewTodo)
  const favorites = useSelector(selectFavoritesNotes)
  const { t } = useTranslation()
  const dispatch = useDispatch()


  const exeptions = {
    trashcan: "Corbeille est vide",
    favorites: "Liste de favori est vide",
  }
  const selectedCategory = useSelector(selectSelectedCategory)

  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch])

  return (
    <>
      {isAddingNewNote ? <NewNote /> : null}
      {isAddingNewTodo ? <NewTodo /> : null}

      {selectedCategory && 
      Object.values(selectedCategory.content).length > 0 ? (
        Object.values(selectedCategory.content)
          .reverse()
          .map((item) => {
            return (
              <Note
                id={item.id}
                key={item.id}
                level={item.level}
                title={item.title}
                noteContent={item.content}
                nestedNotes={item.nestedNotes}
                show_nested_notes={item.show_nested_notes}
                path={item.path}
                parentId={item.id}
                is_favorite={item.is_favorite}
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
            {t("to add a note")}
            {/* <hr />
            <TodoForm />
            {t("to add a todo")} */}
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
//     show_nested_notes={item.show_nested_notes}
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
