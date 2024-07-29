import React from "react"
import "./style.css"
import LangBtn from "./LangBtn"
import flagEn from "./svg/flagEn.svg"
import flagFr from "./svg/flagFr.svg"
import flagRu from "./svg/flagRu.svg"

function DropDownLangList({ onLangSelect }) {
  const langsList = [
    {
      lang: "Fr",
      text: "French",
      source: flagFr,
    },
    {
      lang: "En",
      text: "English",
      source: flagEn,
    },

    {
      lang: "Ru",
      text: "Russian",
      source: flagRu,
    },
  ]

  return (
    <div className='drop-down-lang-list'>
      {langsList.map(({ lang, text, source }) => {
        console.log("language", source)
        return (
          <LangBtn
            key={lang}
            aria-label={text}
            onClick={() => onLangSelect(lang)}
            source={source}
          />
        )
      })}
    </div>
  )
}

export default DropDownLangList
