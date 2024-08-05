import React from "react"
import Category from "./Category"
import "./Category-style.css"
import { useTranslation } from "react-i18next"
import { IoIosAddCircle } from "react-icons/io"
import { RiInboxArchiveFill } from "react-icons/ri";

function CategoryList() {
  const { t } = useTranslation()
  return (
    <div className='category-list'>
      {t("category")}
      <hr />


      

      <button className='category-btn category' aria-label='Add new category'>
        <IoIosAddCircle />
      </button>

    </div>
  )
}

export default CategoryList
