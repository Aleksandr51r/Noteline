import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { FaRegTrashCan } from "react-icons/fa6"
import { IoBookmarksSharp } from "react-icons/io5"
import { GrSort } from "react-icons/gr"
import { BsKanban } from "react-icons/bs"
import getFormattedDateTime from "../../utils/getFormattedDateTime"
import axios from "axios"

const API_BASE_URL = "http://127.0.0.1:8000/api/"

const getInitialSelectedCategoryId = () => {
  const savedName = localStorage.getItem("saved-category")
  return savedName || "unsorted"
}

const findNestedObject = (obj, path, parent = true) => {
  return path.reduce((acc, key) => acc && acc[key], obj)
}

export const addNewCategoryAsync = createAsyncThunk(
  "content/addNewCategoryAsync",
  async ({ name, userId }, thunkAPI) => {
    try {
      // Отправляем POST-запрос на создание новой категории
      const response = await axios.post(
        `${API_BASE_URL}categories/`,
        {
          name: name, // Убедитесь, что это поле соответствует ожиданиям сервера
          user: userId,
        },

        {
          headers: {
            "Content-Type": "application/json", // Убедитесь, что заголовок правильный
          },
        }
      )
      // Возвращаем данные категории
      return response.data
    } catch (error) {
      // Возвращаем ошибку, если запрос завершился неудачно
      console.error(
        "Error creating category:",
        error.response?.data || error.message
      )
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)
export const fetchCategories = createAsyncThunk(
  "content/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}categories/`)
      console.log("response", response)
      return response.data
    } catch (error) {
      console.error("Error fetching categories:", error)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
const initialState = {
  categories: [],
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
        content: {},
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
        isFavorites: false,
        showNestedNotes: true,
        tags: [],
        nestedNotes: {},
        additionalInfo: { timeOfCreation: getFormattedDateTime(), status: 0 },
      }

      category.content = { ...category.content, [newNote.id]: newNote }
    },

    modifyNote: (state, action) => {
      const { path, noteContent } = action.payload
      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )

      const note = findNestedObject(category.content, path)
      note.noteContent = noteContent
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
        todoDescription: "",
        nestedTodos: {},
        showNestedTodo: true,
        tags: [],
        additionalInfo: { timeOfCreation: getFormattedDateTime(), status: 0 },
      }
      category.content = { ...category.content, [newTodo.id]: newTodo }
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
        const path = [...parentTodo.path, "nestedTodos", id]

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
  extraReducers: (builder) => {
    builder
      .addCase(addNewCategoryAsync.fulfilled, (state, action) => {
        state.categories.push(action.payload)
      })
      .addCase(addNewCategoryAsync.pending, (state) => {
        // Handle pending state
      })
      .addCase(addNewCategoryAsync.rejected, (state, action) => {
        // Handle rejected state
        console.error("Failed to add category:", action.payload)
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchCategories.pending, (state) => {
        // Handle pending state
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        // Handle rejected state
        console.error("Failed to fetch categories:", action.payload)
      })
    // обработка состояний ожидания и ошибок
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
  modifyNote,
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

// categories: [
//   {
//     id: "aaaa-1111-aaaa-1111-aaaa",
//     name: "unsorted",
//     icon: GrSort,
//     content: {},
//   },
//   {
//     id: uuidv4(),
//     name: "favorites",
//     icon: IoBookmarksSharp,
//     content: {},
//   },
//   {
//     id: uuidv4(),
//     name: "kanban",
//     icon: BsKanban,
//     content: {},
//   },
//   {
//     id: uuidv4(),
//     name: "trashcan",
//     icon: FaRegTrashCan,
//     content: {},
//   },
// ],
