import React from "react"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = []

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.category.push(action.payload)
    },
  },
})

export default categorySlice.reducer
