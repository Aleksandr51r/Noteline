import React, { useEffect } from "react"
import "./ModalWindow_style.css"
import { useTranslation } from "react-i18next"
import CloseButton from "../../UI/closeButton/CloseButton"
import api from "../../api/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../api/constants"
import { useDispatch } from "react-redux"
import { setError } from "../../redux/slices/errorSlice"

function ModalWindow({
  title,
  Component,
  onChangeMode,
  closeModal,
  route,
  method,
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (username, password, email) => {
    setLoading(true)

    try {
      const res = await api.post(route, { username, password, email })
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate("/")
      } else {
        navigate("/")
      }
    } catch (error) {
      console.log("error", error)
      
      dispatch(
        setError({
          errorMessage: t("Wrong login or password"),
          typeOfToast: "error",
        })
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='modal-body-right'>
      <div className='header'>
        <CloseButton onClick={closeModal} />
      </div>
      <h2>{t(title)}</h2>
      <hr />
      <div className='modal-content'>
        <Component onChangeMode={onChangeMode} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default ModalWindow
