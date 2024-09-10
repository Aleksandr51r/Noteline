import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import getFormattedDateTime from "../../utils/getFormattedDateTime"
import {
  addNewCategoryAsync,
  modifyCategoryAsync,
  deleteCategoryAsync,
  fetchCategories,
} from "../ExtraReducers/ContentSliceExtraReducers"
import {
  fetchNotes,
  addNewNoteExtra,
} from "../ExtraReducers/NoteSliceExtraReducer"

const API_BASE_URL = "http://127.0.0.1:8000/api/"

const getInitialSelectedCategoryId = () => {
  const savedName = localStorage.getItem("saved-category")
  return savedName
}

const findNestedObject = (obj, path, parent = true) => {
  return path.reduce((acc, key) => acc && acc[key], obj)
}

const initialState = {
  categories: {},
  notes: {},
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
        (cat) => cat.name === state.selectedCategoryId
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
    toggleAddingNewNote: (state) => {
      state.isAddingNewNote = !state.isAddingNewNote
    },
    toggleAddingNewNestedNote: (state) => {
      state.isAddingNewNestedNote = !state.isAddingNewNestedNote
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
    toggleAddingNewNestedTodo: (state) => {
      state.isAddingNewNestedTodo = !state.isAddingNewNestedTodo
    },
    toggleAddingNewTodo: (state) => {
      state.isAddingNewTodo = !state.isAddingNewTodo
    },
    handleAllNotesForNestedNote: (state) => {
      console.log("handleAllNotesForNestedNote", state.notes)
    },

    addNestedTodo: (state, action) => {
      const { parentPath, title } = action.payload
      const category = state.categories.find(
        (cat) => cat.name === state.selectedCategoryId
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
        const { id, name, icon } = action.payload
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
      .addCase(fetchNotes.fulfilled, (state, action) => {
        console.log("FETCH ALL NOTES IN SLICE", action.payload)
        state.notes = action.payload.reduce((acc, note) => {
          acc[note.id] = note
          console.log("acc[note.id]", acc[note.id].category)
          state.categories[acc[note.id].category].content[note.id] = note
          return acc
        }, {})
        console.log("*****NOTES after****", state.notes)
      })

      // .addCase(addNewNoteExtra.fulfilled, (state, action) => {
      //   const { id, title, category } = action.payload
      //   state.notes[id] = { id, title, category }
      // })
      .addCase(addNewNoteExtra.fulfilled, (state, action) => {
        // const { id, title, category, content, created_at, tags } =
        //   action.payload
        // const Note = {
        //   category,
        //   id,
        //   type: "note",
        //   level,
        //   title,
        //   content,
        //   is_favorite,
        //   show_nested_notes,
        //   tags,
        //   parent_note,og
        //   additionalInfo: { created_at, last_modified_at, status },
        // }
      })

      .addCase(addNewNoteExtra.pending, (state, action) => {
        console.log("lading")
      })
      .addCase(addNewNoteExtra.rejected, (state, action) => {
        console.error("Failed to add category:", action.payload)
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
  handleAllNotesForNestedNote,
} = contentSlice.actions

export const selectContentList = (state) => state.content.categories
export const selectNotes = (state) => state.content.notes

export const selectSelectedCategory = (state) =>
  state.content.categories[state.content.selectedCategoryId]

export const selectIsAddingNewNote = (state) => state.content.isAddingNewNote
export const selectIsAddingNewNestedNote = (state) =>
  state.content.isAddingNewNestedNote
export const selectIsAddingNewTodo = (state) => state.content.isAddingNewTodo
export const selectIsAddingNewNestedTodo = (state) =>
  state.content.isAddingNewNestedTodo

export default contentSlice.reducer
