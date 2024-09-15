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
  addNewNoteAsync,
  addNoteToFavoriteAsync,
  toggleShowNestedAsync,
} from "../ExtraReducers/NoteSliceExtraReducer"

const API_BASE_URL = "http://127.0.0.1:8000/api/"

const getInitialSelectedCategoryId = () => {
  const savedName = localStorage.getItem("saved-category")
  return savedName
}

const getInitialFavoriteCategoryId = (categories) => {
  const favoriteCategory = Object.values(categories).find(
    (item) => item.name === "favorites"
  )
  return favoriteCategory ? favoriteCategory.id : null
}

const findNestedObject = (obj, path) => {
  return path.reduce((acc, key) => acc && acc[key].nestedNotes, obj)
}

const initialState = {
  categories: {},
  notes: {},
  selectedCategoryId: getInitialSelectedCategoryId(),
  favoriteCategoryId: null,
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
        state.categories[id] = { id, name, icon, content: {} }
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
        state.favoriteCategoryId = getInitialFavoriteCategoryId(
          state.categories
        )

        console.log("fetched category", state.categories)
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
        const notes = action.payload

        notes.sort((a, b) => a.level - b.level)
        const updatedNotes = notes.reduce((acc, note) => {
          acc[note.id] = { ...note, nestedNotes: {} }

          if (note.is_favorite) {
            state.categories[state.favoriteCategoryId].content[note.id] = {
              ...note,
              nestedNotes: null,
            }
          }

          if (note.path.length === 0) {
            state.categories[note.category].content[note.id] = acc[note.id]
          } else {
            const parentNotes = findNestedObject(
              state.categories[note.category].content,
              note.path
            )
            parentNotes[note.id] = acc[note.id]
          }
          return acc
        }, {})

        state.notes = updatedNotes
        console.log("*NOTES after work with it*", state.notes)
      })

      .addCase(addNewNoteAsync.fulfilled, (state, action) => {
        const {
          category,
          id,
          level,
          title,
          content,
          is_favorite,
          show_nested_notes,
          tags,
          created_at,
          last_modified_at,
          status,
          parent_note,
          path,
        } = action.payload
        if (!path) {
          state.categories[category].content[id] = {
            category,
            id,
            level,
            title,
            content,
            is_favorite,
            show_nested_notes,
            tags,
            created_at,
            last_modified_at,
            status,
            parent_note,
            path,
            nestedNotes: {},
          }
        } else {
          const parentNote = findNestedObject(
            state.categories[category].content,
            path
          )

          parentNote[id] = {
            category,
            id,
            level,
            title,
            content,
            is_favorite,
            show_nested_notes,
            tags,
            created_at,
            last_modified_at,
            status,
            parent_note,
            path,
            nestedNotes: {},
          }
        }
      })

      .addCase(addNewNoteAsync.pending, (state, action) => {
        console.log("loading")
      })
      .addCase(addNewNoteAsync.rejected, (state, action) => {
        console.error("Failed to add category:", action.payload)
        const error = action.payload
        console.log(error)
      })

      .addCase(addNoteToFavoriteAsync.fulfilled, (state, action) => {
        const { id, is_favorite } = action.payload
        const note = state.notes[id]
        const categoryContent = state.categories[note.category].content

        state.notes[id] = { ...note, is_favorite }

        if (note.path.length === 0) {
          categoryContent[note.id] = { ...note, is_favorite }
        } else {
          const parentNotes = findNestedObject(categoryContent, note.path)
          parentNotes[note.id] = { ...note, is_favorite }
        }

        if (is_favorite) {
          state.categories[state.favoriteCategoryId].content[id] = {
            ...note,
            is_favorite,
            nestedNotes: null,
          }
        } else {
          delete state.categories[state.favoriteCategoryId].content[id]
        }
      })

      .addCase(addNoteToFavoriteAsync.pending, (state, action) => {})
      .addCase(addNoteToFavoriteAsync.rejected, (state, action) => {})

      .addCase(toggleShowNestedAsync.fulfilled, (state, action) => {
        const { id, show_nested_notes } = action.payload
        state.notes[id] = {
          ...state.notes[id],
          show_nested_notes,
        }
      })
      .addCase(toggleShowNestedAsync.pending, (state, action) => {})
      .addCase(toggleShowNestedAsync.rejected, (state, action) => {})
  },
})

export const {
  addNewContentList,
  setSelectedCategory,
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
export const selectFavoritesNotes = (state) => state.content.favoritesNotes

export const selectSelectedCategory = (state) =>
  state.content.categories[state.content.selectedCategoryId]

export const selectIsAddingNewNote = (state) => state.content.isAddingNewNote
export const selectIsAddingNewNestedNote = (state) =>
  state.content.isAddingNewNestedNote
export const selectIsAddingNewTodo = (state) => state.content.isAddingNewTodo
export const selectIsAddingNewNestedTodo = (state) =>
  state.content.isAddingNewNestedTodo

export default contentSlice.reducer
