import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import getFormattedDateTime from "../../utils/getFormattedDateTime"
import { fetchNotes } from "../ExtraReducers/NoteSliceExtraReducer"

const findNestedObject = (obj, path, parent = true) => {
  return path.reduce((acc, key) => acc && acc[key], obj)
}

const initialState = {
  notes: {},
  isAddingNewNote: false,
  isAddingNewNestedNote: false,
}

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
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
    //   },
    //     extraReducers: (builder) => {
    //       builder.addCase(fetchNotes.fulfilled, (state, action) => {
    //         console.log("from note slice", action.payload)
    //       })
  },
})

export const {
  addNewNote,
  addNestedNote,
  modifyNote,
  toggleAddingNewNestedNote,
  //   toggleAddingNewNote,
} = noteSlice.actions

export default noteSlice.reducer
