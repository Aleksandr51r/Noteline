import React, { useState } from "react"
import "./Starting-styles.css"
import { MdAccountCircle } from "react-icons/md"
import { GiBlackBook } from "react-icons/gi"
import { PiGraphThin } from "react-icons/pi"
import LightSwitch from "../../UI/LightSwitch/LightSwitch"
import LanguageSelect from "../../language/LanguageSelect"
import { useTranslation } from "react-i18next"
import ModalWindow from "../ModalWindow/ModalWindow"
import Registation from "./Registration/Registation"

function Starting() {
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <nav className='navbar navbar-expand-lg navbar-custom-style'>
      <div className='container-fluid'>
        <div>
          <div>
            <a className='navbar-brand nav-link-text ' href='#'>
              <PiGraphThin /> 𝐆𝐫𝐚𝐩𝐡 𝐍𝐨𝐭𝐞
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
            <ModalWindow
              title='registration'
              Component={Registation}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Starting
