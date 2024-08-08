import React from "react"
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { FaRegTrashCan } from "react-icons/fa6"
import { MdOutlineDoneOutline } from "react-icons/md"

const initialState = [
  {
    id: uuidv4(),
    name: "doneList",
    icon: MdOutlineDoneOutline,
    content: [],
  },
  {
    id: uuidv4(),
    name: "trashcan",
    icon: FaRegTrashCan,
    content: [],
  },
]

const staticContentSlice = createSlice({
  name: "staticContents",
  initialState,
  reducers: {
    addNewContentList: (state, action) => {
      const name = action.payload
    },
  },
})

export const { addNewContentList } = staticContentSlice.actions

export const selectStaticContentList = (state) => state.staticContents

export default staticContentSlice.reducer
