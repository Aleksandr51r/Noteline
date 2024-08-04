import React, { useState, useEffect } from "react"
import DropDownLangList from "./DropDownLangList.jsx"
import LangBtn from "./LangBtn"
import flagEn from "./svg/flagEn.svg"
import flagFr from "./svg/flagFr.svg"
import flagRu from "./svg/flagRu.svg"

import { useTranslation } from "react-i18next"

function LanguageSelect() {
  const { i18n } = useTranslation()
  const langFlags = {
    en: flagEn,
    fr: flagFr,
    ru: flagRu,
  }
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  // Set a language to localStorage
  const [chosenLang, setChosenLang] = useState(() => {
    const savedLangueage = localStorage.getItem("language")
    return savedLangueage || "fr"
  })

  // Get a language from localStorage
  useEffect(() => {
    localStorage.setItem("language", chosenLang)
    console.log("savedLangueage", chosenLang)
  }, [chosenLang])

  // Set a language in i18n
  const handleLangSelect = (lang) => {
    setChosenLang(lang)
    i18n.changeLanguage(lang)
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
