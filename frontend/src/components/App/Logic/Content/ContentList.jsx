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
import { addNewCategoryAsync } from "../../../../redux/slices/contentSlice"
import { fetchCategories } from "../../../../redux/ExtraReducers/ContentSliceExtraReducers"

function ContentList() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const contentList = useSelector(selectContentList)

  const choosenCategoryId = useSelector(
    (state) => state.content.selectedCategoryId
  )

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const categoryListRefresh = () => {

  }

  const handleChoseCategory = (id) => {
    dispatch(setSelectedCategory(id))
  }


  return (
    <>
      <div className='category-main'>
        <div className='category-list-header'>
          <span>{t("category")}</span>
          <br />
          <br />
          {Object.values(contentList)
            .slice(0, 2)
            .map((contentPart) => (
              <Category
                id={contentPart.id}
                key={contentPart.id}
                name={t(contentPart.name)}
                icon={contentPart.icon}
                addedClassName={`${
                  choosenCategoryId && contentPart.id === choosenCategoryId
                    ? "choosen"
                    : ""
                }`}
                addedIconClassName={contentPart.name}
                onClick={() => {
                  handleChoseCategory(contentPart.id)
                }}
                categoryListRefresh={categoryListRefresh}
              />
            ))}
        </div>
        <div className='category-list'>
          {Object.values(contentList)
            .slice(4)
            .map((contentPart) => (
              <Category
                id={contentPart.id}
                key={contentPart.id}
                name={contentPart.name}
                onClick={() => handleChoseCategory(contentPart.id)}
                icon={contentPart.icon}
                addedClassName={`${
                  choosenCategoryId && contentPart.id === choosenCategoryId
                    ? "choosen"
                    : ""
                }`}
                categoryListRefresh={categoryListRefresh}
              />
            ))}
        </div>

        <NewCategoryInput />
        {/* {Object.values(contentList).length > 3 && (
          <div>
            <Category
              id={Object.values(contentList)[3].id}
              key={Object.values(contentList)[3].id}
              name={t(Object.values(contentList)[3].name)}
              icon={Object.values(contentList)[3].icon}
              addedClassName={`${
                choosenCategoryId &&
                Object.values(contentList)[3].id === choosenCategoryId
                  ? "choosen"
                  : ""
              }`}
              addedIconClassName={Object.values(contentList)[3].name}
              onClick={() =>
                handleChoseCategory(Object.values(contentList)[3].id)
              }
              categoryListRefresh={categoryListRefresh}
            />
          </div>
        )} */}
      </div>
    </>
  )
}

export default ContentList
