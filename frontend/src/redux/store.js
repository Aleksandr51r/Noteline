import { configureStore } from "@reduxjs/toolkit"
import errorReducer from "./slices/errorSlice"
import contentReducer from "./slices/contentSlice"
import filterSlice from "./slices/filterSlice"

const store = configureStore({
  reducer: {
    error: errorReducer,
    content: contentReducer,
    filter: filterSlice,
  },
})

export default store
