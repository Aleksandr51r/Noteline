import React from "react"
import { IoCloseCircleOutline } from "react-icons/io5"
import "./CloseButton-style.css"

function CloseButton({ onClick }) {
  return (
    <button className='close-button' onClick={onClick}>
      <IoCloseCircleOutline className='close-icon' onClick={onClick} />
    </button>
  )
}

export default CloseButton
