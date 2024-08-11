import React from "react"
import "../Tools-style.css"
import Search from "../Search/Search"

function ToolBar() {
  return (
    <div className='tool-bar'>
      <Search />
      <div className='tools-button'></div>
    </div>
  )
}

export default ToolBar
