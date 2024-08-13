import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import getFormattedDateTime from "../../utils/getFormattedDateTime"

const initialState = []

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewNote: (state, action) => {
      const title = action.payload.title
      const noteContent = action.payload.noteContent
      state.push({
        id: uuidv4(),
        title,
        noteContent,
        status: 0,
        tags: [],
        additionalInfo: { timeOfCreation: getFormattedDateTime() },
      })
    },
  },
})

export const { addNewNote } = noteSlice.actions

export const selctNotes = (state) => state.notes

export default noteSlice.reducer
