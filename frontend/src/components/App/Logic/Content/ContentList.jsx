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
import { fetchCategories } from "../../../../redux/slices/contentSlice"
import api from "../../../../api/api"

function ContentList() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const contentList = useSelector(selectContentList)
  // const [contentList, setCategories] = useState([])

  useEffect(() => {
    dispatch(fetchCategories())
    console.log("sended")
  }, [dispatch])

  // const getCategories = () => {
  //   api
  //     .get("/api/categories/")
  //     .then((res) => res.data)
  //     .then((data) => {
  //       setCategories(data)
  //       console.log("data", data)
  //     })
  //     .catch((error) => alert(error))
  // }

  // Получение категорий через API
  // const getCategories = async () => {
  //   try {
  //     const res = await api.get("/api/categories/")
  //     setCategories(res.data)
  //     console.log("data", res.data)
  //   } catch (error) {
  //     alert(error.message || "Failed to fetch categories")
  //   }
  // }

  // const deleteCategory = (id) => {
  //   api
  //     .delete(`/api/categories/delete/${id}`)
  //     .then((res) => {
  //       if (res.status === 204) {
  //         alert("Category was deleted")
  //       } else {
  //         alert("Faild to delete note!")
  //       }
  //       getCategories()
  //     })
  //     .catch((err) => alert(err))
  // }

  console.log("contentList", contentList)

  const choosenCategory = useSelector(selectSelectedCategory)

  // useEffect(() => {
  //   console.log("redux", contentList)
  //   console.log("fetch", fetchCategories)
  // }, [contentList])

  // console.log("contentList", contentList)

  const handleChoseCategory = (name) => {
    dispatch(setSelectedCategory(name))
  }

  return (
    <>
      <div className='category-main'>
        <div className='category-list-header'>
          <span>{t("category")}</span>
          <br />
          <br />
          {contentList.slice(0, 2).map((contentPart) => (
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
