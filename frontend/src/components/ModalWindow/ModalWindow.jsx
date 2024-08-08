import React from "react"
import "./ModalWindow_style.css"
import { useTranslation } from "react-i18next"
import CloseButton from "../../UI/closeButton/CloseButton"

function ModalWindow({ title, Component, isModalOpen, closeModal }) {
  const { t } = useTranslation()

  if (!isModalOpen) return null
  return (
    <div className='modal-root'>
      <div
        className={`overlay ${isModalOpen ? "open" : "closed"}`}
        onClick={closeModal}
      />
      <div className={`modal-body-right ${isModalOpen ? "open" : "closed"}`}>
        <div className='header'>
          <CloseButton onClick={closeModal} />
        </div>
        <h2>{t(title)}</h2>
        <hr />
        <div className='modal-content'>
          <Component />
        </div>
      </div>
    </div>
  )
}

export default ModalWindow
