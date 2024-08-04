import React from "react"
import "./DropDownLangList_style.css"
import LangBtn from "./LangBtn"
import flagEn from "./svg/flagEn.svg"
import flagFr from "./svg/flagFr.svg"
import flagRu from "./svg/flagRu.svg"

function DropDownLangList({ onLangSelect }) {
  const langsList = [
    {
      lang: "fr",
      text: "French",
      source: flagFr,
    },
    {
      lang: "en",
      text: "English",
      source: flagEn,
    },

    {
      lang: "ru",
      text: "Russian",
      source: flagRu,
    },
  ]

  return (
    <div className='drop-down-lang-list'>
      {langsList.map(({ lang, text, source }) => {
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
