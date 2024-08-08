import { configureStore } from "@reduxjs/toolkit"
import errorReducer from "./slices/errorSlice"
import contentReducer from "./slices/contentSlice"
import staticContentReducer from "./slices/staticContentSlice"

const store = configureStore({
  reducer: {
    error: errorReducer,
    content: contentReducer,
    staticContents: staticContentReducer,
  },
})

export default store
