import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { FaRegTrashCan } from "react-icons/fa6"
import { MdOutlineDoneOutline } from "react-icons/md"
import { RiInboxArchiveFill } from "react-icons/ri"

const getInitialSelectedCategoryId = () => {
  const savedId = localStorage.getItem("saved-category")
  return savedId || "inbox"
}

const initialState = {
  categories: [
    {
      id: "aaaa-1111-aaaa-1111-aaaa",
      name: "inbox",
      icon: RiInboxArchiveFill,
      content: [
        "Test1",
        "Test2",
        "Test3",
        "Test4",
        "Test5",
        "Test6",
        "Test7",
        "Test8",
        "Test9",
        "Test10",
        "Test11",
        "Test12",
        "Test13",
        "Test14",
        "Test15",
        "Test16",
        "Test17",
        "Test18",
        "Test19",
        "Test20",
        "Test21",
        "Test22",
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
        "Test76",
        "Test77",
        "Test78",
        "Test79",
        "Test80",
        "Test81",
        "Test82",
        "Test83",
        "Test84",
        "Test85",
        "Test86",
        "Test87",
        "Test88",
        "Test89",
        "Test90",
        "Test91",
        "Test92",
        "Test93",
        "Test94",
        "Test95",
        "Test96",
        "Test97",
        "Test98",
        "Test99",
        "Test100",
      ],
    },
    {
      id: uuidv4(),
      name: "doneList",
      icon: MdOutlineDoneOutline,
      content: [],
    },
    {
      id: 3,
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
  selectedCategoryId: getInitialSelectedCategoryId(),
}

const staticContentSlice = createSlice({
  name: "staticContents",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload
      localStorage.setItem("saved-category", action.payload)
    },
  },
})

export const { setSelectedCategory } = staticContentSlice.actions

export const selectStaticContentList = (state) =>
  state.staticContents.categories

export const selectSelectedCategory = (state) =>
  state.staticContents.categories.find(
    (category) => category.name === state.staticContents.selectedCategoryId
  )

export default staticContentSlice.reducer
