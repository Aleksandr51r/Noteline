import React from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsQuestionDiamond } from "react-icons/bs"
import { useState } from "react"
import ModalWindow from "../../ModalWindow/ModalWindow"
import AppSettings from "../AppSettings/AppSettings"
import "./FixedHeader_style.css"

function FixedHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className='fixed-header'>
      <h3 className='title'>𝐆𝐫𝐚𝐩𝐡 𝐍𝐨𝐭𝐞</h3>
      <BsQuestionDiamond className='fixed-header-item' size='25px' />
      <IoSettingsOutline
        size='25px'
        className='fixed-header-item'
        onClick={openModal}
      />
      <ModalWindow
        title='settings'
        Component={AppSettings}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}

export default FixedHeader
