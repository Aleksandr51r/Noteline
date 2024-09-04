// api.js
import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const API_BASE_URL = "http://127.0.0.1:8000/api/"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await api.get("categories/")
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Fetch notes
export const fetchNotes = async () => {
  try {
    const response = await api.get("notes/")
    return response.data
  } catch (error) {
    console.error("Error fetching notes:", error)
    throw error
  }
}

// Fetch todos
export const fetchTodos = async () => {
  try {
    const response = await api.get("todos/")
    return response.data
  } catch (error) {
    console.error("Error fetching todos:", error)
    throw error
  }
}

// Create a new note
export const createNote = async (noteData) => {
  try {
    const response = await api.post("notes/", noteData)
    return response.data
  } catch (error) {
    console.error("Error creating note:", error)
    throw error
  }
}

// Create a new todo
export const createTodo = async (todoData) => {
  try {
    const response = await api.post("todos/", todoData)
    return response.data
  } catch (error) {
    console.error("Error creating todo:", error)
    throw error
  }
}
export const createCategory = async (todoData) => {
  try {
    const response = await api.post("categories/", todoData)
    return response.data
  } catch (error) {
    console.error("Error creating category:", error)
    throw error
  }
}

// Add other CRUD operations as needed
