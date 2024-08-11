import React from "react"
import { selectSelectedCategory } from "../../../../redux/slices/staticContentSlice"
import { useSelector } from "react-redux"
import Note from "../Notes/Note"

function ContentOfSelectedList() {
  const selectedCategory = useSelector(selectSelectedCategory)

  return (
    <>
      {selectedCategory &&
        selectedCategory.content.map((text, index) => (
          <Note key={index} noteContent={text} />
        ))}
    </>
  )
}

export default ContentOfSelectedList
