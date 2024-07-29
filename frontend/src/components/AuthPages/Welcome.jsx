import React from "react"
import "./styles.css"
import { MdAccountCircle } from "react-icons/md"
import { GiBlackBook } from "react-icons/gi"
import { PiGraphThin } from "react-icons/pi"
import LightSwitch from "../../utils/LightSwitch/LightSwitch"
import LanguageSelect from "../language/LanguageSelect"


function Welcome() {
  return (
    <nav
      className='navbar bg-dark navbar-expand-lg bg-body-tertiary '
      data-bs-theme='dark'
    >
      <div className='container-fluid'>
        <div>
          <div>
            <a className='navbar-brand' href='#'>
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
                <a className='nav-link active' aria-current='page' href='#'>
                  Guide <GiBlackBook />
                </a>
              </li>

              <li className='nav-item'>
                <a className='nav-link active' href='#'>
                  Account <MdAccountCircle />
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
