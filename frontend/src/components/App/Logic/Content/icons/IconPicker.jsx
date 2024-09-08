import React, { useState } from "react"
import { Icon_stock } from "./icons"
import "./iconPicker-style.css"

function IconPicker({ onSelectIcon }) {
  const [selectedIcon, setSelectedIcon] = useState(null)

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName)
    onSelectIcon(iconName)
  }

  return (
    <div className='icon-picker'>
      {Object.keys(Icon_stock).map((iconName) => (
        <div
          key={iconName}
          className={`icon-item ${selectedIcon === iconName ? "selected" : ""}`}
          onClick={() => handleIconClick(iconName)} 
        >
          {Icon_stock[iconName]}
        </div>
      ))}
    </div>
  )
}

export default IconPicker
