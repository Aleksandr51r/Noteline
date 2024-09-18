import React, { useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsQuestionDiamond } from "react-icons/bs"
import ModalWindow from "../../ModalWindow/ModalWindow"
import AppSettings from "../AppSettings/AppSettings"
import "./FixedHeader_style.css"
import LightSwitch from "../../../UI/LightSwitch/LightSwitch"
import Overlay from "../../Overlay"

function FixedHeader() {
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
        <h4 className='title'>Noteline</h4>
        <LightSwitch />
        {/* <BsQuestionDiamond className='fixed-header-item' size='25px' /> */}
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
