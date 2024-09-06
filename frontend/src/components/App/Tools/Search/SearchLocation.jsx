import React from "react"
import "../Tools-style.css"
import Search from "../Search/Search"
import { selectSelectedCategory } from "../../../../redux/slices/contentSlice"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import "./Search-style.css"

function SearchLocation() {
  const { t } = useTranslation()
  const selectedCategory = useSelector(selectSelectedCategory)

  return (
    <div className='search-location'>
      <div className='name-of-selected-category'>
        <h2 className='category-name-selected'>
          {/* {t(`${selectedCategory.name}`)} */}
        </h2>
      </div>
      <Search />
    </div>
  )
}

export default SearchLocation
