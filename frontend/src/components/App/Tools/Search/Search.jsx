import React, { useState, useTransition } from "react"
import "./Search-style.css"
import { PiEraserFill } from "react-icons/pi"
import { useTranslation } from "react-i18next"

function Search() {
  const { t } = useTranslation()
  const [inputText, setInputState] = useState("")

  const handleInputText = (e) => {
    setInputState(e.target.value)
  }
  return (
    <div className='search'>
      {inputText && (
        <button
          className={`button-broom ${inputText ? "visible" : ""}`}
          onClick={() => setInputState("")}
        >
          <PiEraserFill className='broom-icon' />
        </button>
      )}
      <input
        type='text'
        placeholder={t("search")}
        value={inputText}
        onChange={handleInputText}
        className='search-bar'
      />

      <select className='search-select'>
        <option className='search-option'>{t("here")}</option>
        <option className='search-option'>{t("global")}</option>
      </select>
    </div>
  )
}

export default Search
