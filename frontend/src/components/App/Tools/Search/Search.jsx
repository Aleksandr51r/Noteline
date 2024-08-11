import React, { useState } from "react"
import "./Search-style.css"
import { PiEraserFill } from "react-icons/pi";

function Search() {
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
        placeholder='Search'
        value={inputText}
        onChange={handleInputText}
        className='search-bar'
      />

      <select className='search-select'>
        <option className='search-option'>Here</option>
        <option className='search-option'>Global</option>
      </select>
    </div>
  )
}

export default Search
