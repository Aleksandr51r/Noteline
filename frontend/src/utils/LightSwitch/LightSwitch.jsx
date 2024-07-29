import React, { useEffect } from "react"
import { useState } from "react"
import { MdOutlineLightMode, MdOutlineNightlightRound } from "react-icons/md"
import "./LightSwitch.css"

function LightSwitch() {
  const [isLight, setIsLight] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme === "light" ? true : false
  })

  useEffect(() => {
    localStorage.setItem("theme", isLight ? "light" : "dark")
  })

  const handleChange = () => {
    setIsLight((prevIsLight) => !prevIsLight)
  }
  return (
    <button
      className='color-mode-btn'
      onClick={() => {
        handleChange()
      }}
    >
      {isLight ? <MdOutlineNightlightRound /> : <MdOutlineLightMode />}
    </button>
  )
}

export default LightSwitch
