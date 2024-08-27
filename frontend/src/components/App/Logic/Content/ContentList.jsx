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
    dispatch(setSelectedCategory(name))
  }

  return (
    <>
      <div className='category-main'>
        <div className='category-list-header'>
          <span>
            {t("category")}
            </span>
          <br />
          <br />
          {contentList.slice(0, 3).map((contentPart) => (
            <Category
              key={contentPart.id}
              name={t(contentPart.name)}
              Icon={contentPart.icon}
              addedClassName={`static ${
                choosenCategory && contentPart.name === choosenCategory.name
                  ? "choosen"
                  : ""
              }`}
              addedIconClassName={contentPart.name}
              onClick={() => {
                handleChoseCategory(contentPart.name)
              }}
            />
          ))}
        </div>
        <div className='category-list'>
          {contentList.slice(4).map((contentPart) => (
            <Category
              key={contentPart.id}
              name={t(contentPart.name)}
              onClick={() => handleChoseCategory(contentPart.name)}
              addedClassName={`${
                choosenCategory && contentPart.name === choosenCategory.name
                  ? "choosen"
                  : ""
              }`}
            />
          ))}
        </div>

        <NewCategoryInput />

        {contentList.length > 3 && (
          <div>
            <Category
              key={contentList[3].id}
              name={t(contentList[3].name)}
              Icon={contentList[3].icon}
              addedClassName={`static ${
                choosenCategory && contentList[3].name === choosenCategory.name
                  ? "choosen"
                  : ""
              }`}
              addedIconClassName={contentList[3].name}
              onClick={() => {
                handleChoseCategory(contentList[3].name)
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ContentList
