import { configureStore } from "@reduxjs/toolkit"
import errorReducer from "./slices/errorSlice"
import contentReducer from "./slices/contentSlice"
import noteSlice from "./slices/NoteSlice"
import filterSlice from "./slices/filterSlice"

const store = configureStore({
  reducer: {
    error: errorReducer,
    content: contentReducer,
    notes: noteSlice,
    filter: filterSlice,
  },
})

export default store

// import staticContentReducer from "./slices/staticContentSlice"
// staticContents: staticContentReducer,
