import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import Category from "./Category"
import NewCategoryInput from "./NewCategoryInput/NewCategoryInput"
import {
  selectContentList,
  setSelectedCategory,
  selectSelectedCategory,
} from "../../../../redux/slices/contentSlice"
import "./Category-style.css"

function ContentList() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const contentList = useSelector(selectContentList)
  const choosenCategory = useSelector(selectSelectedCategory)

  useEffect(() => {
    console.log(contentList)
  }, [contentList])

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
            key={contentList[0].id}
            name={t(contentList[0].name)}
            Icon={contentList[0].icon}
            addedClassName={`static ${
              contentList[0].name === choosenCategory.name ? "choosen" : ""
            }`}
            addedIconClassName={contentList[0].name}
            onClick={() => {
              handleChoseCategory(contentList[0].name)
            }}
          />
        </div>
        <div className='category-list'>
          {contentList.slice(2).map((contentPart) => (
            <Category
              key={contentPart.id}
              name={contentPart.name}
              onClick={() => handleChoseCategory(contentPart.name)}
              addedClassName={`${
                contentPart.name === choosenCategory.name ? "choosen" : ""
              }`}
            />
          ))}
        </div>

        <NewCategoryInput />

        <div>
          <Category
            key={contentList[1].id}
            name={t(contentList[1].name)}
            Icon={contentList[1].icon}
            addedClassName={`static ${
              contentList[1].name === choosenCategory.name ? "choosen" : ""
            }`}
            addedIconClassName={contentList[1].name}
            onClick={() => {
              handleChoseCategory(contentList[1].name)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ContentList
