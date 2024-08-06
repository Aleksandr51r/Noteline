import React, { useState } from "react"
import Category from "./Category"
import "./Category-style.css"
import { useTranslation } from "react-i18next"
import { RiInboxArchiveFill } from "react-icons/ri"
import NewCategory from "./NewCategoryModal/NewCategoryModal"

function CategoryList() {
  const { t } = useTranslation()

  return (
    <div className='category-list'>
      {t("category")}
      <hr />
      <NewCategory />
    </div>
  )
}

export default CategoryList
