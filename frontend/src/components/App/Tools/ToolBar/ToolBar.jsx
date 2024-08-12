import React from "react"
import "../Tools-style.css"
import Search from "../Search/Search"
import { selectSelectedCategory } from "../../../../redux/slices/staticContentSlice"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import SearchLocation from "../Search/SearchLocation"
import ControlPanel from "../ControlPanel/ControlPanel"

function ToolBar() {
  const { t } = useTranslation()
  const selectedCategory = useSelector(selectSelectedCategory)
  // console.log("selectedCategory", selectedCategory.name)

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
