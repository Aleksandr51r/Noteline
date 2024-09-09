import { ToastContainer, toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import "react-toastify/dist/ReactToastify.css"
import {
  clearError,
  selectErrorMessage,
  selectErrorType,
} from "../../redux/slices/errorSlice"
import { useEffect } from "react"

const Error = () => {
  const errorMessage = useSelector(selectErrorMessage)
  const errorType = useSelector(selectErrorType)
  const dispatch = useDispatch()

  const color = localStorage.getItem("theme")
  const toastTypes = {
    info: toast.info,
    success: toast.success,
    warning: toast.warn,
    error: toast.error,
  }
  useEffect(() => {
    if (errorMessage) {
      const toastMethod = toastTypes[errorType] || toast.info
      toastMethod(errorMessage)
      dispatch(clearError())
    }
  }, [errorMessage, dispatch])

  return (
    <ToastContainer theme={color} position='bottom-center' autoClose={2000} />
  )
}

export default Error
