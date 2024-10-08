import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "@reduxjs/toolkit"
import { selectAllNotes } from "./contentSlice"

const initialState = {
  filterContent: "",
  onlyFavorite: false,
  onlyInSelectedCategory: true,
  searchResult: {},
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setContentFilter: (state, action) => {
      state.filterContent = action.payload
    },
    setOnlySelectedCategotyFilter: (state) => {
      state.onlyInSelectedCategory = !state.onlyInSelectedCategory
    },

    resetFilters: () => {
      return initialState
    },
  },
})

export const { setContentFilter, setOnlySelectedCategotyFilter, resetFilters } =
  filterSlice.actions

export const selectFilteredNotes = createSelector(
  [selectAllNotes, (state) => state.filter.filterContent],
  (notes, filterContent) => {
    if (!filterContent) return notes

    return notes.filter(
      (note) =>
        note.title.includes(filterContent) ||
        note.content.includes(filterContent)
    )
  }
)

export const onlyInSelectedCategory = (state) =>
  state.filter.onlyInSelectedCategory
export const selectOnlyFaivoriteFilter = (state) => state.filter.onlyFavorite
export const selectFilterContent = (state) => state.filter.filterContent
export const selectSearchResult = (state) => state.filter.seacrchResult

export default filterSlice.reducer

// or we can do like this
// return {
//   ...state,
//   title: action.payload,
// }
