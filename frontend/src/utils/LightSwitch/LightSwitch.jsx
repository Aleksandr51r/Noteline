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
    document.documentElement.setAttribute(
      "savedTheme",
      isLight ? "light" : "dark"
    )
  }, [isLight])


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
      {isLight ? <MdOutlineNightlightRound className="btn-icon"/> : <MdOutlineLightMode className="btn-icon"/>}
    </button>
  )
}

export default LightSwitch
