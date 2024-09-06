import React, { useEffect } from "react"
import "./ModalWindow_style.css"
import { useTranslation } from "react-i18next"
import CloseButton from "../../UI/closeButton/CloseButton"

import api from "../../api/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../api/constants"

function ModalWindow({
  title,
  Component,
  onChangeMode,
  closeModal,
  route,
  method,
}) {
  const { t } = useTranslation()


  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (username, password) => {
    setLoading(true)
    // e.preventDefault()

    try {
      console.log({ username, password })
      const res = await api.post(route, { username, password })
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate("/")
      } else {
        navigate("/")
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`modal-body-right`}>
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

// import React, { useEffect } from "react"
// import "./ModalWindow_style.css"
// import { useTranslation } from "react-i18next"
// import CloseButton from "../../UI/closeButton/CloseButton"
// import Overlay from "../Overlay"

// function ModalWindow({
//   title,
//   Component,
//   isModalOpen,
//   closeModal,
//   onChangeMode,
// }) {
//   const { t } = useTranslation()

//   useEffect(() => {
//     onChangeMode(false)
//   }, [closeModal])

//   if (!isModalOpen) return null
//   return (
//     <div className='modal-root'>
//       <Overlay onClick={closeModal} />
//       <div className={`modal-body-right ${isModalOpen ? "open" : "closed"}`}>
//         <div className='header'>
//           <CloseButton onClick={closeModal} />
//         </div>
//         <h2>{t(title)}</h2>
//         <hr />
//         <div className='modal-content'>
//           <Component onChangeMode={onChangeMode} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ModalWindow
