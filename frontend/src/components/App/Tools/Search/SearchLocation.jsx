import React from "react"
import "../Tools-style.css"
import Search from "../Search/Search"
import { selectSelectedCategory } from "../../../../redux/slices/staticContentSlice"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import "./Search-style.css"

function SearchLocation() {
  const { t } = useTranslation()
  const selectedCategory = useSelector(selectSelectedCategory)
  // console.log("selectedCategory", selectedCategory.name)

  return (
    <div className='search-location'>
      <div className='name-of-selected-category'>
        <h2>selectedCategory</h2>
      </div>
      <Search />
    </div>
  )
}

export default SearchLocation
