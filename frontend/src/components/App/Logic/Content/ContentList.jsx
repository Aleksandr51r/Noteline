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

  const categoryListRefresh = () => {
    dispatch(fetchCategories())
    console.log("sended2")
  }

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

  const handleChoseCategory = (id) => {
    dispatch(setSelectedCategory(id))
    console.log("choosenCategory", id)
  }

  return (
    <>
      <div className='category-main'>
        <div className='category-list-header'>
          <span>{t("category")}</span>
          <br />
          <br />
          {/* {Object.values(contentList.content)} */}
          {contentList.slice(0, 2).map((contentPart) => (
            <Category
              id={contentPart.id}
              key={contentPart.id}
              name={t(contentPart.name)}
              icon={contentPart.icon}
              addedClassName={`${
                choosenCategory && contentPart.id === choosenCategory.id
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
          {contentList.slice(4).map((contentPart) => (
            <Category
              id={contentPart.id}
              key={contentPart.id}
              name={contentPart.name}
              onClick={() => handleChoseCategory(contentPart.id)}
              icon={contentPart.icon}
              addedClassName={`${
                choosenCategory && contentPart.id === choosenCategory.id
                  ? "choosen"
                  : ""
              }`}
              categoryListRefresh={categoryListRefresh}
            />
          ))}
        </div>

        <NewCategoryInput />

        {contentList.length > 3 && (
          <div>
            <Category
              id={contentList[3].id}
              key={contentList[3].id}
              name={t(contentList[3].name)}
              icon={contentList[3].icon}
              addedClassName={`${
                choosenCategory && contentList[3].id === choosenCategory.id
                  ? "choosen"
                  : ""
              }`}
              addedIconClassName={contentList[3].name}
              onClick={() => {
                handleChoseCategory(contentList[3].id)
              }}
              categoryListRefresh={categoryListRefresh}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ContentList
