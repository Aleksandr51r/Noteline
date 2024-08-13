import { configureStore } from "@reduxjs/toolkit"
import errorReducer from "./slices/errorSlice"
import contentReducer from "./slices/contentSlice"
import noteSlice from "./slices/NoteSlice"

const store = configureStore({
  reducer: {
    error: errorReducer,
    content: contentReducer,
    notes: noteSlice,
  },
})

export default store

// import staticContentReducer from "./slices/staticContentSlice"
// staticContents: staticContentReducer,