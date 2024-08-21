import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { FaRegTrashCan } from "react-icons/fa6"
import { MdDeleteForever } from "react-icons/md"
import { MdOutlineDoneOutline } from "react-icons/md"
import { FaBookmark } from "react-icons/fa6"
import { IoBookmarksSharp } from "react-icons/io5"
import { FiBookmark } from "react-icons/fi"
import { GrSort } from "react-icons/gr"
import { BsKanban } from "react-icons/bs"

import { HiArrowDownOnSquareStack } from "react-icons/hi2"
import { HiDocumentArrowDown } from "react-icons/hi2"
import { HiFolderArrowDown } from "react-icons/hi2"
import { HiOutlineArrowDownOnSquareStack } from "react-icons/hi2"
import { PiArrowSquareInBold } from "react-icons/pi"
import getFormattedDateTime from "../../utils/getFormattedDateTime"

const getInitialSelectedCategoryId = () => {
  const savedName = localStorage.getItem("saved-category")
  return savedName || "inbox"
}

const initialState = {
  categories: [
    {
      id: "aaaa-1111-aaaa-1111-aaaa",
      name: "unsorted",
      icon: GrSort,
      content: [],
    },
    {
      id: uuidv4(),
      name: "favorites",
      icon: IoBookmarksSharp,
      content: [],
    },
    {
      id: uuidv4(),
      name: "kanban",
      icon: BsKanban,
      content: [],
    },
    {
      id: uuidv4(),
      name: "trashcan",
      icon: FaRegTrashCan,
      content: [],
    },
  ],
  selectedCategoryName: getInitialSelectedCategoryId(),
  isAddingNewNote: false,
  isAddingNewNestedNote: false,
  isAddingNewTodo: false,
}

const contentSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    addNewContentList: (state, action) => {
      const name = action.payload
      state.categories.push({
        id: uuidv4(),
        name,
        content: [],
      })
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategoryName = action.payload
      localStorage.setItem("saved-category", action.payload)
    },
    addNewNote: (state, action) => {
      const title = action.payload
      const level = 1

      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )
      category.content.unshift({
        id: uuidv4(),
        type: "note",
        level,
        title,
        noteContent: "",
        nestedNotes: [],
        showNestedNotes: true,
        tags: [],
        additionalInfo: { timeOfCreation: getFormattedDateTime(), status: 0 },
      })
    },

    addNewTodo: (state, action) => {
      const title = action.payload
      const level = 1

      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )

      category.content.unshift({
        id: uuidv4(),
        type: "todo",
        isComplited: false,
        level,
        title,
        todoPresicion: "",
        nestedNotes: [],
        showNestedTodo: false,
        tags: [],
        additionalInfo: { timeOfCreation: getFormattedDateTime(), status: 0 },
      })
    },

    toggleAddingNewNote: (state) => {
      state.isAddingNewNote = !state.isAddingNewNote
    },
    toggleAddingNewNestedNote: (state) => {
      state.isAddingNewNestedNote = !state.isAddingNewNestedNote
    },
    toggleAddingNewTodo: (state) => {
      state.isAddingNewTodo = !state.isAddingNewTodo
    },

    addNestedNote: (state, action) => {
      const { parentId, title } = action.payload
      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )

      const parentNote = category.content.find((note) => note.id === parentId)
      const level = parentNote.level + 1
      if (parentNote) {
        parentNote.nestedNotes.unshift({
          id: uuidv4(),
          type: "note",
          level,
          title,
          noteContent: "",
          tags: [],
          nestedNotes: [],
          showNestedNotes: true,
          additionalInfo: { timeOfCreation: getFormattedDateTime(), status: 0 },
        })
      }
    },
    addNestedTodo: (state, action) => {
      const { parentId, title } = action.payload
      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )

      const parentTodo = category.content.find((todo) => todo.id === parentId)
      const level = parentTodo.level + 1
      if (parentTodo) {
        parentTodo.nestedTodos.unshift({
          id: uuidv4(),
          type: "todo",
          isComplited: false,
          level,
          title,
          noteContent: "",
          status: 0,
          tags: [],
          nestedNotes: [],
          additionalInfo: { timeOfCreation: getFormattedDateTime() },
        })
      }
    },
  },
})

export const {
  addNewContentList,
  setSelectedCategory,
  addNewNote,
  toggleAddingNewNote,
  toggleAddingNewNestedNote,
  toggleAddingNewTodo,
  addNewTodo,
  addNestedNote,
} = contentSlice.actions

export const selectContentList = (state) => state.content.categories

export const selectIsAddingNewNote = (state) => state.content.isAddingNewNote
export const selectIsAddingNewNestedNote = (state) =>
  state.content.isAddingNewNestedNote

export const selectIsAddingNewTodo = (state) => state.content.isAddingNewTodo

export const selectSelectedCategory = (state) =>
  state.content.categories.find(
    (category) => category.name === state.content.selectedCategoryName
  )

export default contentSlice.reducer
