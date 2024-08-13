import React from "react"
import { selectSelectedCategory } from "../../../../redux/slices/staticContentSlice"


function NewNote() {
  const selectedCategory = useSelector(selectSelectedCategory)
  return <div>NewNote</div>
}

export default NewNote
