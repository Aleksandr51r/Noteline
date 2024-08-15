import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { FaRegTrashCan } from "react-icons/fa6"
import { MdDeleteForever } from "react-icons/md"
import { MdOutlineDoneOutline } from "react-icons/md"
import { FaBookmark } from "react-icons/fa6"
import { IoBookmarksSharp } from "react-icons/io5"
import { FiBookmark } from "react-icons/fi"

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

const generateNote = (level, title) => ({
  id: uuidv4(),
  level,
  title,
  type: "note",
  noteContent: `Content for ${title}`,
  status: Math.floor(Math.random() * 5), // Случайное значение статуса от 0 до 4
  tags: [`tag${Math.floor(Math.random() * 3)}`], // Один из трех случайных тегов
  nestedNotes: [],
  additionalInfo: { timeOfCreation: getFormattedDateTime() },
})

const initialState = {
  categories: [
    {
      id: "aaaa-1111-aaaa-1111-aaaa",
      name: "inbox",
      icon: HiFolderArrowDown,
      content: [
        generateNote(1, "Note 1"),
        generateNote(2, "Note 2"),
        generateNote(3, "Note 3"),
        generateNote(4, "Note 4"),
        generateNote(5, "Note 5"),
        generateNote(6, "Note 6"),
        generateNote(7, "Note 7"),
        generateNote(8, "Note 8"),
        generateNote(9, "Note 9"),
        generateNote(10, "Note 10"),
        generateNote(1, "Note 11"),
        generateNote(2, "Note 12"),
        generateNote(3, "Note 13"),
        generateNote(4, "Note 14"),
        generateNote(5, "Note 15"),
        generateNote(6, "Note 16"),
        generateNote(7, "Note 17"),
        generateNote(8, "Note 18"),
        generateNote(9, "Note 19"),
        generateNote(10, "Note 20"),
        generateNote(1, "Note 21"),
      ],
    },
    {
      id: uuidv4(),
      name: "Favorites",
      icon: FiBookmark,
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
      let level = 1

      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )

      category.content.unshift({
        id: uuidv4(),
        type: "note",
        level,
        title,
        noteContent: "",
        status: 0,
        tags: [],
        nestedNotes: [],
        additionalInfo: { timeOfCreation: getFormattedDateTime() },
      })
    },

    addNewTodo: (state, action) => {
      const title = action.payload
      let level = 1

      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )

      category.content.unshift({
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
    },
    toggleAddingNewNote: (state) => {
      state.isAddingNewNote = !state.isAddingNewNote
    },
    toggleAddingNewTodo: (state) => {
      state.isAddingNewTodo = !state.isAddingNewTodo
    },
    // addNestedNote: (state, action) => {
    //   const title = action.payload.title
    //   const category = state.categories.find(
    //     (cat) => cat.name === state.selectedCategoryName
    //   )
    //   level++;

    //   category.content.unshift({
    //     id: uuidv4(),
    //     level,
    //     title,
    //     noteContent: "",
    //     status: 0,
    //     tags: [],
    //     nestedNotes: [],
    //     additionalInfo: { timeOfCreation: getFormattedDateTime() },
    //   })
    // },
  },
})

export const {
  addNewContentList,
  setSelectedCategory,
  addNewNote,
  toggleAddingNewNote,
  toggleAddingNewTodo,
  addNewTodo,
} = contentSlice.actions

export const selectContentList = (state) => state.content.categories

export const selectIsAddingNewNote = (state) => state.content.isAddingNewNote
export const selectIsAddingNewTodo = (state) => state.content.isAddingNewTodo

export const selectSelectedCategory = (state) =>
  state.content.categories.find(
    (category) => category.name === state.content.selectedCategoryName
  )

export default contentSlice.reducer
