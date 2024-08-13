import React from "react"
import { selectSelectedCategory } from "../../../../redux/slices/contentSlice"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Note from "../Notes/Note"
import NoteForm from "../../Tools/NoteForm/NoteForm"
import TodoForm from "../../Tools/TodoForm/TodoForm"

function ContentOfSelectedList() {
  const selectedCategory = useSelector(selectSelectedCategory)
  const { t } = useTranslation()

  console.log("selectedCategory", selectedCategory.content.length)

  return (
    <>
      {selectedCategory.content.length > 0 ? (
        selectedCategory.content.map((text, index) => (
          <Note key={index} noteContent={text} />
        ))
      ) : (
        <h2>
          {t("list is empty")}
          <hr />
          {t("press")}
          <NoteForm />
          {t("to add a note and")}
          <TodoForm />
          {t("to add a todo")}
        </h2>
      )}
    </>
  )
}

export default ContentOfSelectedList
