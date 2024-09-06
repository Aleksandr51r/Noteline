import React, { useState, useEffect, useRef } from "react"
import { IoIosAddCircle } from "react-icons/io"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { addNewContentList } from "../../../../../redux/slices/contentSlice"
import { setError } from "../../../../../redux/slices/errorSlice"
import "./NewCategoryInput-style.css"
import Overlay from "../../../../Overlay"
import { addNewCategoryAsync } from "../../../../../redux/slices/contentSlice"
import api from "../../../../../api/api"

function NewCategoryInput() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [inputText, setInputText] = useState("")

  const inputRef = useRef(null)

  const createCategory = (e) => {
    e.preventDefault()
    api
      .post("/api/categories/", { inputText })
      .then((res) => {
        if (res.status === 201) {
          alert("Category was created")
        } else {
          alert("Faild to create note!")
        }
        // getCategories()
      })
      .catch((err) => alert(err))
  }

  useEffect(() => {
    if (isAddingCategory && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAddingCategory])

  const handleInputText = (e) => {
    setInputText(e.target.value)
  }

  const closeAndClear = () => {
    setInputText("")
    setIsAddingCategory(false)
  }

  const handleAddNewCategory = () => {
    if (inputText) {
      // dispatch(addNewContentList(inputText))
      const name = inputText
      dispatch(addNewCategoryAsync(name))
      setInputText("")
      // console.log("fetchCategories", () => fetchCategories)
      setIsAddingCategory(false)
    } else {
      dispatch(setError("Complete the field!"))
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNewCategory()
    } else if (e.key === "Escape") {
      closeAndClear()
    }
  }

  return (
    <>
      {isAddingCategory && (
        <>
          <Overlay onClick={closeAndClear} />
          <form className='new-category-input' onSubmit={createCategory}>
            <input
              ref={inputRef}
              type='text'
              placeholder={t("New name")}
              value={inputText}
              onChange={(e) => handleInputText(e)}
              className='input-add-category'
              onKeyDown={handleKeyDown}
            />
            <button
              className='btn-standart confirm-add-category'
              type='submit'
              onClick={handleAddNewCategory}
            >
              {t("add")}
            </button>
          </form>
        </>
      )}
      {!isAddingCategory && (
        <button
          className='category-btn category'
          aria-label={t("Add new category")}
          onClick={() => setIsAddingCategory(true)}
        >
          <IoIosAddCircle />
        </button>
      )}
    </>
  )
}

export default NewCategoryInput
