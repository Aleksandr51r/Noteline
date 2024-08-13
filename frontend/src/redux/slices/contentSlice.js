import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { FaRegTrashCan } from "react-icons/fa6"
import { MdDeleteForever } from "react-icons/md"
import { MdOutlineDoneOutline } from "react-icons/md"

import { HiArrowDownOnSquareStack } from "react-icons/hi2"
import { HiDocumentArrowDown } from "react-icons/hi2"
import { HiFolderArrowDown } from "react-icons/hi2"
import { HiOutlineArrowDownOnSquareStack } from "react-icons/hi2"
import { PiArrowSquareInBold } from "react-icons/pi"

const getInitialSelectedCategoryId = () => {
  const savedName = localStorage.getItem("saved-category")
  return savedName || "inbox"
}

const initialState = {
  categories: [
    {
      id: "aaaa-1111-aaaa-1111-aaaa",
      name: "inbox",
      icon: HiFolderArrowDown,
      content: [
        "Test23",
        "Test24",
        "Test25",
        "Test26",
        "Test27",
        "Test28",
        "Test29",
        "Test30",
        "Test31",
        "Test32",
        "Test33",
        "Test34",
        "Test35",
        "Test36",
        "Test37",
        "Test38",
        "Test39",
        "Test40",
        "Test41",
        "Test42",
        "Test43",
        "Test44",
        "Test45",
        "Test46",
        "Test47",
        "Test48",
        "Test49",
        "Test50",
        "Test51",
        "Test52",
        "Test53",
        "Test54",
        "Test55",
        "Test56",
        "Test57",
        "Test58",
        "Test59",
        "Test60",
        "Test61",
        "Test62",
        "Test63",
        "Test64",
        "Test65",
        "Test66",
        "Test67",
        "Test68",
        "Test69",
        "Test70",
        "Test71",
        "Test72",
        "Test73",
        "Test74",
        "Test75",
      ],
    },
    {
      id: uuidv4(),
      name: "trashcan",
      icon: FaRegTrashCan,
      content: [
        "TrashItem1",
        "TrashItem2",
        "TrashItem3",
        "TrashItem4",
        "TrashItem5",
        "TrashItem6",
        "TrashItem7",
        "TrashItem8",
        "TrashItem9",
        "TrashItem10",
        "TrashItem11",
        "TrashItem12",
        "TrashItem13",
        "TrashItem14",
        "TrashItem15",
        "TrashItem16",
        "TrashItem17",
      ],
    },
  ],
  selectedCategoryName: getInitialSelectedCategoryId(),
}

const contentSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    addNewContentList: (state, action) => {
      const name = action.payload
      state.categories.push({
        id: uuidv4(),
        name,
        content: [],
      })
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategoryName = action.payload
      localStorage.setItem("saved-category", action.payload)
    },
  },
})

export const { addNewContentList, setSelectedCategory } = contentSlice.actions

export const selectContentList = (state) => state.content.categories

export const selectSelectedCategory = (state) =>
  state.content.categories.find(
    (category) => category.name === state.content.selectedCategoryName
  )

export default contentSlice.reducer
