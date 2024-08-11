import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import Category from "./Category"
import NewCategoryInput from "./NewCategoryInput/NewCategoryInput"
import { selectContentList } from "../../../../redux/slices/contentSlice"
import {
  selectStaticContentList,
  setSelectedCategory,
} from "../../../../redux/slices/staticContentSlice"
import "./Category-style.css"

function ContentList() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const contentList = useSelector(selectContentList)
  const staticContentList = useSelector(selectStaticContentList)

  // useEffect(() => {
  //   console.log(contentList)
  // }, [contentList])

  const handleChoseCategory = (name) => {
    console.log("id", name)
    dispatch(setSelectedCategory(name))
  }

  return (
    <>
      <div className='category-main'>
        <div className='category-list-header'>
          {t("category")}
          <hr />

          <Category
            key={staticContentList[0].id}
            name={t(staticContentList[0].name)}
            Icon={staticContentList[0].icon}
            addedClassName={"static"}
            addedIconClassName={staticContentList[0].name}
            onClick={() => {
              handleChoseCategory(staticContentList[0].name)
            }}
          />
        </div>
        <div className='category-list'>
          {contentList.map((contentPart) => (
            <Category
              key={contentPart.id}
              name={contentPart.name}
              onClick={() => handleChoseCategory(contentPart.name)}
            />
          ))}
        </div>

        <NewCategoryInput />

        <div>
          {staticContentList.slice(1).map((staticCategory) => (
            <Category
              key={staticCategory.id}
              name={t(staticCategory.name)}
              Icon={staticCategory.icon}
              addedClassName={"static"}
              addedIconClassName={staticCategory.name}
              onClick={() => {
                handleChoseCategory(staticCategory.name)
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ContentList
