import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import Category from "./Category"
import NewCategoryInput from "./NewCategoryInput/NewCategoryInput"
import { v4 as uuidv4 } from "uuid"
import { selectContentList } from "../../../../redux/slices/contentSlice"
import { selectStaticContentList } from "../../../../redux/slices/staticContentSlice"
import "./Category-style.css"

function ContentList() {
  const { t } = useTranslation()
  const contentList = useSelector(selectContentList)
  const staticContentList = useSelector(selectStaticContentList)

  useEffect(() => {
    console.log(contentList)
  }, [contentList])

  return (
    <>
      <div className='category-main'>
        <div className='category-list-header'>
          {t("category")}
          <hr />
        </div>
        <div className='category-list'>
          {contentList.map((contentPart) => (
            <Category key={contentPart.id} name={contentPart.name} />
          ))}
        </div>

        <NewCategoryInput />

        <div>
          {staticContentList.map((staticCategory) => (
            <Category
              key={staticCategory.id}
              name={t(staticCategory.name)}
              Icon={staticCategory.icon}
              addedClassName={"static"}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ContentList
