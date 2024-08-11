import React, { useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsQuestionDiamond } from "react-icons/bs"
import ModalWindow from "../../ModalWindow/ModalWindow"
import AppSettings from "../AppSettings/AppSettings"
import "./FixedHeader_style.css"
import { useModal } from "../../ModalWindow/useModal"
import LightSwitch from "../../../UI/LightSwitch/LightSwitch"

function FixedHeader() {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <div className='fixed-header'>
        <h4 className='title'>𝐍𝐎𝐓𝐄𝐋𝐈𝐍𝐄</h4>
        <LightSwitch />
        <BsQuestionDiamond className='fixed-header-item' size='25px' />
        <IoSettingsOutline
          size='25px'
          className='fixed-header-item'
          onClick={openModal}
        />
      </div>
      <ModalWindow
        title='settings'
        Component={AppSettings}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  )
}

export default FixedHeader
