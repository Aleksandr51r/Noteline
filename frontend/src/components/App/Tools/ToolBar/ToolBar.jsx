import React from "react"
import "../Tools-style.css"
import { useTranslation } from "react-i18next"
import SearchLocation from "../Search/SearchLocation"
import ControlPanel from "../ControlPanel/ControlPanel"

function ToolBar() {
  const { t } = useTranslation()

  return (
    <div className='tool-bar'>
      <SearchLocation />
      <div className='tools-control-panel'>
        <ControlPanel />
      </div>
    </div>
  )
}

export default ToolBar
