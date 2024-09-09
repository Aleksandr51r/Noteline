import { createSlice } from "@reduxjs/toolkit"

const initialState = { errorMessage: "", typeOfToast: "" }

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload
    },
    clearError: () => {
      return initialState
    },
  },
})

export const { setError, clearError } = errorSlice.actions

export const selectErrorMessage = (state) => state.error.errorMessage
export const selectErrorType = (state) => state.error.typeOfToast

export default errorSlice.reducer
