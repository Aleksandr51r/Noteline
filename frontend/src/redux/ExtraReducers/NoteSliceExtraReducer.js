import api from "../../api/api"
import { v4 as uuidv4 } from "uuid"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
  const response = await api.get("api/notes/")
  return response.data
})
export const toggleShowNestedAsync = createAsyncThunk(
  "content/toggleShowNestedAsync",
  async ({ id, show_nested_notes }) => {
    const response = await api.patch(`/api/notes/${id}/`, {
      show_nested_notes: show_nested_notes,
    })
    return response.data
  }
)

export const addNoteToFavoriteAsync = createAsyncThunk(
  "content/addNoteToFavorites",
  async ({ id, is_favorite, path }) => {
    const response = await api.patch(`/api/notes/${id}/`, {
      is_favorite,
    })
    return response.data
  }
)

export const addNewNoteAsync = createAsyncThunk(
  "note/addNewNote",
  async ({ title, category, parent_note, level, path, content }) => {
    const id = uuidv4()

    const response = await api.post("/api/notes/", {
      id,
      title,
      level,
      content,
      category,
      parent_note,
      path,
      parent_note,
    })
    return response.data
  }
)
export const modifyNameNoteAsync = createAsyncThunk(
  "note/modifyNameNoteAsync",
  async ({ id, title }) => {
    const response = await api.patch(`/api/notes/${id}/`, {
      title: title,
    })
    return response.data
  }
)
export const modifyContentNoteAsync = createAsyncThunk(
  "note/modifyContentNoteAsync",
  async ({ id, content, path }) => {
    const response = await api.patch(`/api/notes/${id}/`, {
      content,
    })
    return response.data
  }
)

export const deleteNoteAsync = createAsyncThunk(
  "note/deleteNoteAsync",
  async ({ id, path }) => {
    const response = await api.delete(`/api/notes/${id}/`)
    return { id, path }
  }
)
