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
  return savedName || "unsorted"
}

const findNestedObject = (obj, path) => {
  return path.reduce((acc, key) => acc && acc[key], obj)
}

const initialState = {
  categories: [
    {
      id: "aaaa-1111-aaaa-1111-aaaa",
      name: "unsorted",
      icon: GrSort,
      content: {},
    },
    {
      id: uuidv4(),
      name: "favorites",
      icon: IoBookmarksSharp,
      content: {},
    },
    {
      id: uuidv4(),
      name: "kanban",
      icon: BsKanban,
      content: {},
    },
    {
      id: uuidv4(),
      name: "trashcan",
      icon: FaRegTrashCan,
      content: {},
    },
  ],
  selectedCategoryName: getInitialSelectedCategoryId(),
  isAddingNewNote: false,
  isAddingNewNestedNote: false,
  isAddingNewTodo: false,
  isAddingNewNestedTodo: false,
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
      const id = uuidv4()

      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )

      const newNote = {
        id,
        type: "note",
        level,
        title,
        noteContent: "",
        path: [id],
        showNestedNotes: true,
        tags: [],
        nestedNotes: {},
        additionalInfo: { timeOfCreation: getFormattedDateTime(), status: 0 },
      }

      category.content[newNote.id] = newNote
    },

    addNewTodo: (state, action) => {
      const title = action.payload
      const level = 1
      const id = uuidv4()

      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )
      const newTodo = {
        id,
        type: "todo",
        isComplited: false,
        level,
        title,
        path: [id],
        todoPresicion: "",
        nestedTodos: {},
        showNestedTodo: false,
        tags: [],
        additionalInfo: { timeOfCreation: getFormattedDateTime(), status: 0 },
      }
      category.content[newTodo.id] = newTodo
    },

    toggleAddingNewNote: (state) => {
      state.isAddingNewNote = !state.isAddingNewNote
    },
    toggleAddingNewNestedNote: (state) => {
      state.isAddingNewNestedNote = !state.isAddingNewNestedNote
    },
    toggleAddingNewNestedTodo: (state) => {
      state.isAddingNewNestedTodo = !state.isAddingNewNestedTodo
    },
    toggleAddingNewTodo: (state) => {
      state.isAddingNewTodo = !state.isAddingNewTodo
    },

    addNestedNote: (state, action) => {
      const { parentPath, title } = action.payload
      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )

      const parentNote = findNestedObject(category.content, parentPath)

      console.log("parentPath", parentPath)
      console.log("parentNote", parentNote)
      const id = uuidv4()

      if (parentNote) {
        const level = parentNote.level + 1
        const path = [...parentNote.path, "nestedNotes", id]
        const newNestedNote = {
          id,
          type: "note",
          level,
          title,
          noteContent: "",
          tags: [],
          nestedNotes: {},
          showNestedNotes: true,
          path,
          additionalInfo: { timeOfCreation: getFormattedDateTime(), status: 0 },
        }

        parentNote.nestedNotes[newNestedNote.id] = newNestedNote
      }
    },
    addNestedTodo: (state, action) => {
      const { parentPath, title } = action.payload
      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )
      const parentTodo = findNestedObject(category.content, parentPath)
      const id = uuidv4()

      if (parentTodo) {
        const level = parentTodo.level + 1
        const path = [...parentTodo.path, "nestedNotes", id]

        const newNestedTodo = {
          id,
          type: "todo",
          isComplited: false,
          level,
          title,
          path,
          todoPresicion: "",
          nestedTodos: {},
          showNestedTodos: false,
          tags: [],
          additionalInfo: { timeOfCreation: getFormattedDateTime(), status: 0 },
        }

        parentTodo.nestedTodos[newNestedTodo.id] = newNestedTodo
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
  addNestedTodo,
  addNestedNote,
  toggleAddingNewNestedTodo,
} = contentSlice.actions

export const selectContentList = (state) => state.content.categories

export const selectIsAddingNewNote = (state) => state.content.isAddingNewNote
export const selectIsAddingNewNestedNote = (state) =>
  state.content.isAddingNewNestedNote

export const selectIsAddingNewNestedTodo = (state) =>
  state.content.isAddingNewNestedTodo

export const selectIsAddingNewTodo = (state) => state.content.isAddingNewTodo

export const selectSelectedCategory = (state) =>
  state.content.categories.find(
    (category) => category.name === state.content.selectedCategoryName
  )

export default contentSlice.reducer
