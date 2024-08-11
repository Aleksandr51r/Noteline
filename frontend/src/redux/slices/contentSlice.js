import React from "react"
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"


const initialState = [

]

const contentSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    addNewContentList: (state, action) => {
      const newDate = new Date()
      const year = newDate.getFullYear()
      const month = newDate.getMonth() + 1
      const day = newDate.getDate()
      const hours = newDate.getHours()
      const minutes = newDate.getMinutes()

      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`

      const name = action.payload
      state.push({
        id: uuidv4(),
        name,
        content: [],
        additionalInfo: [formattedDate],
      })
    },
  },
})

export const { addNewContentList } = contentSlice.actions

export const selectContentList = (state) => state.content

export default contentSlice.reducer
