import api from "../../api/api"
import { v4 as uuidv4 } from "uuid"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
  const response = await api.get("api/notes/")
  return response.data
})

export const addNewNoteExtra = createAsyncThunk(
  "note/addNewNote",
  async ({ title, category, parent_note, level, path }) => {
    const id = uuidv4()
    const content = "Empty note"
    const response = await api.post("/api/notes/", {
      id,
      title,
      level,
      content,
      category,
      parent_note,
      path,
    })
    return response.data
  }
)
