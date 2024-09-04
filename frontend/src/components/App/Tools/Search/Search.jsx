import React, { useEffect, useState, useTransition } from "react"
import "./Search-style.css"
import { PiEraserFill } from "react-icons/pi"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  setContentFilter,
  setOnlySelectedCategotyFilter,
  resetFilters,
  selectOnlyFaivoriteFilter,
  selectFilterContent,
  onlyInSelectedCategory,
} from "../../../../redux/slices/filterSlice"

function Search() {
  const { t } = useTranslation()
  const [inputText, setInputState] = useState("")
  const dispatch = useDispatch()
  const filterContent = useSelector(selectFilterContent)
  const weSearchHere = useSelector(selectFilterContent)
  const searchPlace = useSelector(onlyInSelectedCategory)

  const handleInputText = (e) => {
    dispatch(setContentFilter(e.target.value))
  }

  useEffect(() => {
    console.log("filterContent", filterContent)
  }, [filterContent])

  const handleResetFilter = () => {
    dispatch(resetFilters())
  }
  const handlePlaceForSearching = (e) => {
    const selectedValue = e.target.value === "true"
    dispatch(setOnlySelectedCategotyFilter(selectedValue))
  }



  return (
    <div className='search'>
      {filterContent && (
        <button
          className={`button-broom ${filterContent ? "visible" : ""}`}
          onClick={handleResetFilter}
        >
          <PiEraserFill className='broom-icon' />
        </button>
      )}
      <input
        type='text'
        placeholder={t("search")}
        value={filterContent}
        onChange={handleInputText}
        className={`search-bar${filterContent ? "search-bar-filled" : ""}`}
      />

      <select
        className='search-select'
        value={searchPlace}
        onChange={handlePlaceForSearching}
      >
        <option className='search-option' value={true}>
          {t("here")}
        </option>
        <option className='search-option' value={false}>
          {t("global")}
        </option>
      </select>
    </div>
  )
}

export default Search
