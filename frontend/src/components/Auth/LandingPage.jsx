import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { MdAccountCircle } from "react-icons/md"
import { GiBlackBook } from "react-icons/gi"
import { PiGraphThin } from "react-icons/pi"
import LightSwitch from "../../UI/LightSwitch/LightSwitch"
import LanguageSelect from "../../language/LanguageSelect"
import ModalWindow from "../ModalWindow/ModalWindow"
import "./Starting-styles.css"
import LogIn from "./Registration/LogIn"
import SignUp from "./Registration/SignUp"
import Overlay from "../Overlay"
import { IoCreateSharp } from "react-icons/io5"

function LandingPage() {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isForSignUp, setIsForSignUp] = useState(false)

  const handleMode = (value = !isForSignUp) => {
    setIsForSignUp(value)
  }
  const closeAndClear = () => {
    setIsModalOpen(false)
    setIsForSignUp(false)
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-custom-style'>
        <div className='container-fluid'>
          <div>
            <div>
              <a className='navbar-brand nav-link-text ' href='#'>
                <h3 className='text-landing-page'>Noteline</h3>
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
                  {/* <a
                    className='nav-link nav-link-text'
                    aria-current='page'
                    href='#'
                  >
                    {t("guide")} <GiBlackBook className='nav-link-text' />
                  </a> */}
                </li>

                <li className='nav-item nav-link-text'>
                  <a
                    className='nav-link nav-link-text'
                    href='#'
                    onClick={() => {
                      setIsModalOpen(true)
                    }}
                  >
                    <span className='text-landing-page'>{t("account")}</span>

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
      <div className='landing-discription'>
        <h3>{t("Create your personal base of knowledge")}</h3>
        <div>
          <IoCreateSharp style={{ width: "40px", height: "90px" }} />
        </div>
      </div>

      {isModalOpen && (
        <>
          <Overlay onClick={closeAndClear} />
          {isForSignUp ? (
            <ModalWindow
              title='SignUp'
              Component={SignUp}
              onChangeMode={handleMode}
              closeModal={closeAndClear}
              route='/api/user/register/'
              method='signup'
            />
          ) : (
            <ModalWindow
              title='registration'
              Component={LogIn}
              onChangeMode={handleMode}
              closeModal={closeAndClear}
              route='/api/token/'
              method='login'
            />
          )}
        </>
      )}
    </>
  )
}
export default LandingPage
