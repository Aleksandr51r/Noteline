import React, { useState, useEffect, useRef } from "react"
import { IoIosAddCircle } from "react-icons/io"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { addNewContentList } from "../../../../../redux/slices/contentSlice"
import { setError } from "../../../../../redux/slices/errorSlice"
import "./NewCategoryInput-style.css"

function NewCategoryInput() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [inputText, setInputText] = useState("")

  const inputRef = useRef(null)

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
      dispatch(addNewContentList(inputText))
      setInputText("")
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
          <div
            className={`overlay ${isAddingCategory ? "open" : "closed"}`}
            onClick={closeAndClear}
          ></div>
          <div className='new-category-input'>
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
              type='button'
              onClick={handleAddNewCategory}
            >
              {t("add")}
            </button>
          </div>
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
