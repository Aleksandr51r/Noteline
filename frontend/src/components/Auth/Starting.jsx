import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useModal } from "../ModalWindow/useModal"
import { MdAccountCircle } from "react-icons/md"
import { GiBlackBook } from "react-icons/gi"
import { PiGraphThin } from "react-icons/pi"
import LightSwitch from "../../UI/LightSwitch/LightSwitch"
import LanguageSelect from "../../language/LanguageSelect"
import ModalWindow from "../ModalWindow/ModalWindow"
import Registation from "./Registration/Registation"
import "./Starting-styles.css"

function Starting() {
  const { t } = useTranslation()
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-custom-style'>
        <div className='container-fluid'>
          <div>
            <div>
              <a className='navbar-brand nav-link-text ' href='#'>
                <PiGraphThin /> Note line
              </a>
            </div>
          </div>
          <div>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <a
                    className='nav-link nav-link-text'
                    aria-current='page'
                    href='#'
                  >
                    {t("guide")} <GiBlackBook className='nav-link-text' />
                  </a>
                </li>

                <li className='nav-item nav-link-text'>
                  <a
                    className='nav-link nav-link-text'
                    href='#'
                    onClick={openModal}
                  >
                    {t("account")}
                    <MdAccountCircle className='nav-link-text' />
                  </a>
                </li>

                <li className='nav-item d-flex justify-content-center align-items-center'>
                  <LightSwitch />
                </li>

                <li className='nav-item d-flex justify-content-center align-items-center'>
                  <LanguageSelect />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ModalWindow
        title='registration'
        Component={Registation}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  )
}

export default Starting
