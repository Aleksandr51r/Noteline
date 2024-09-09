import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

import getFormattedDateTime from "../../utils/getFormattedDateTime"
import axios from "axios"
import api from "../../api/api"

const API_BASE_URL = "http://127.0.0.1:8000/api/"

const getInitialSelectedCategoryId = () => {
  const savedName = localStorage.getItem("saved-category")
  return savedName
}

const findNestedObject = (obj, path, parent = true) => {
  return path.reduce((acc, key) => acc && acc[key], obj)
}

export const addNewCategoryAsync = createAsyncThunk(
  "content/addNewCategoryAsync",
  async (name) => {
    const id = uuidv4()
    const response = await api.post("/api/categories/", {
      id,
      icon: "default",
      name,
    })
    return response.data
  }
)
export const modifyCategoryAsync = createAsyncThunk(
  "content/modifyCategoryAsync",
  async ({ id, icon, name }) => {
    const response = await api.patch(`/api/categories/${id}/`, {
      icon: icon,
      name: name,
    })
    return response.data
  }
)


export const deleteCategoryAsync = createAsyncThunk(
  "content/deleteCategoryAsync",
  async ({ id }) => {
    const response = await api.delete(`/api/categories/${id}/`)
    return id
  }
)

export const fetchCategories = createAsyncThunk(
  "content/fetchCategories",
  async () => {
    const response = await api.get("/api/categories/")
    console.log("get one category", response.data)
    return response.data
  }
)

const initialState = {
  categories: {},
  selectedCategoryId: getInitialSelectedCategoryId(),
  isAddingNewNote: false,
  isAddingNewNestedNote: false,
  isAddingNewTodo: false,
  isAddingNewNestedTodo: false,
}

const contentSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload
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

    modifyNote: (state, action) => {
      const { path, noteContent } = action.payload
      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryName
      )

      const note = findNestedObject(category.content, path)
      note.noteContent = noteContent
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
        const id = uuidv4()
        const { name, icon } = action.payload
        state.categories[id] = { id, name, icon }
      })

      .addCase(addNewCategoryAsync.pending, (state) => {})
      .addCase(addNewCategoryAsync.rejected, (state, action) => {
        console.error("Failed to add category:", action.payload)
      })
      .addCase(modifyCategoryAsync.fulfilled, (state, action) => {
        const { id, icon, name } = action.payload
        state.categories[id].name = name
        state.categories[id].icon = icon
      })
      .addCase(modifyCategoryAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(modifyCategoryAsync.rejected, (state, action) => {
        console.error("Failed to Modify category:", action.payload)
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.reduce((acc, category) => {
          acc[category.id] = { ...category, content: {} }
          return acc
        }, {})
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.error("Failed to fetch categories:", action.payload)
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        const id = action.payload
        delete state.categories[id]
      })
      .addCase(deleteCategoryAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        console.error("Failed to fetch categories:", action.payload)
      })
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

export const selectSelectedCategory = (state) =>
  state.content.categories[state.content.selectedCategoryId]

export const selectIsAddingNewNote = (state) => state.content.isAddingNewNote
export const selectIsAddingNewNestedNote = (state) =>
  state.content.isAddingNewNestedNote
export const selectIsAddingNewTodo = (state) => state.content.isAddingNewTodo
export const selectIsAddingNewNestedTodo = (state) =>
  state.content.isAddingNewNestedTodo

export default contentSlice.reducer
