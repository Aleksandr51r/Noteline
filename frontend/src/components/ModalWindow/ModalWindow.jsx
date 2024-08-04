import React from "react"
import "./ModalWindow_style.css"
import { IoCloseCircleOutline } from "react-icons/io5"
import { useTranslation } from "react-i18next"

function ModalWindow({ title, Component, isOpen, onClose }) {
  const { t } = useTranslation()
  if (!isOpen) return null

  return (
    <div className='modal-root'>
      <div className={`overlay ${isOpen ? 'open' : 'closed'}`} onClick={onClose}></div>
      <div className={`modal-body ${isOpen ? 'open' : 'closed'}`}>
        <div className='header'>
          <h2>{t(title)}</h2>
          <button className='close-button' onClick={onClose}>
            <IoCloseCircleOutline className='close-icon' />
          </button>
        </div>
        <hr />
        <div className='modal-content'>
          <Component />
        </div>
      </div>
    </div>
  );
}

export default ModalWindow
