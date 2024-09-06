import React, { useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsQuestionDiamond } from "react-icons/bs"
import ModalWindow from "../../ModalWindow/ModalWindow"
import AppSettings from "../AppSettings/AppSettings"
import "./FixedHeader_style.css"
import { useModal } from "../../ModalWindow/useModal"
import LightSwitch from "../../../UI/LightSwitch/LightSwitch"
import Overlay from "../../Overlay"

function FixedHeader() {
  // const { isModalOpen, openModal, closeModal } = useModal()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openSettings = () => {
    setIsModalOpen(true)
  }

  const closeAndClear = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className='fixed-header'>
        <h4 className='title'>𝐍𝐎𝐓𝐄𝐋𝐈𝐍𝐄</h4>
        <LightSwitch />
        <BsQuestionDiamond className='fixed-header-item' size='25px' />
        <IoSettingsOutline
          size='25px'
          className='fixed-header-item'
          onClick={openSettings}
        />
      </div>
      {isModalOpen && (
        <>
          <Overlay onClick={closeAndClear} />

          <ModalWindow
            title='settings'
            Component={AppSettings}
            closeModal={closeAndClear}
          />
        </>
      )}
    </>
  )
}

export default FixedHeader
