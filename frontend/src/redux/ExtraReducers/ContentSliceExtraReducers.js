import api from "../../api/api"
import { v4 as uuidv4 } from "uuid"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchCategories = createAsyncThunk(
  "content/fetchCategories",
  async () => {
    const response = await api.get("/api/categories/")
    console.log("fetched category", response.data)
    return response.data
  }
)

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
