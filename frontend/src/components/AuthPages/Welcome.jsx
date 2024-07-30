import React from "react"
import "./styles.css"
import { MdAccountCircle } from "react-icons/md"
import { GiBlackBook } from "react-icons/gi"
import { PiGraphThin } from "react-icons/pi"
import LightSwitch from "../../utils/LightSwitch/LightSwitch"
import LanguageSelect from "../language/LanguageSelect"
import { useTranslation } from "react-i18next"

function Welcome() {
  const { t } = useTranslation()
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
                <a className='nav-link nav-link-text' href='#'>
                {t('account')} <MdAccountCircle className='nav-link-text' />
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
  )
}

export default Welcome
