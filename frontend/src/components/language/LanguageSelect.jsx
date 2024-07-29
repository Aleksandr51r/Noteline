import React, { useState, useEffect } from "react"
import DropDownLangList from "./DropDownLangList.jsx"
import LangBtn from "./LangBtn"
import flagEn from "./svg/flagEn.svg"
import flagFr from "./svg/flagFr.svg"
import flagRu from "./svg/flagRu.svg"
import "./style.css"

function LanguageSelect() {
  const langFlags = {
    En: flagEn,
    Fr: flagFr,
    Ru: flagRu,
  }
  const [chosenLang, setChosenLang] = useState(() => {
    const savedLangueage = localStorage.getItem("language")
    return savedLangueage || "En";
  })

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem("language", chosenLang)
  }, [chosenLang])

  const handleLangSelect = (lang) => {
    setChosenLang(lang)
    setIsDropDownOpen(false)
  }

  return (
    <>
      <LangBtn
        source={langFlags[chosenLang]}
        aria-label={`Selected language: ${chosenLang}`}
        onClick={() => {
          setIsDropDownOpen(!isDropDownOpen)
        }}
      />
      {isDropDownOpen && <DropDownLangList onLangSelect={handleLangSelect} />}
    </>
  )
}

export default LanguageSelect
