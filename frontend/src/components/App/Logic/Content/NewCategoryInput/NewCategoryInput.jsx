import React, { useState } from "react"

import { IoIosAddCircle } from "react-icons/io"
import { useTranslation } from "react-i18next"

import { useDispatch } from "react-redux"

import { addNewContentList } from "../../../../../redux/slices/contentSlice"

import { setError } from "../../../../../redux/slices/errorSlice"

import CloseButton from "../../../../../UI/closeButton/CloseButton"
import "./NewCategoryInput-style.css"

function NewCategoryInput() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false)
  const [inputText, setInputText] = useState("")

  const handleInputText = (e) => {
    setInputText(e.target.value)
  }

  const closeAndClear = () => {
    setInputText("")
    setIsNewCategoryOpen(false)
  }

  const handleAddNewCategory = () => {
    if (inputText) {
      dispatch(addNewContentList(inputText))
      setInputText("")
      setIsNewCategoryOpen(!isNewCategoryOpen)
    } else {
      dispatch(setError("Complete the field!"))
    }
  }

  return (
    <>
      {isNewCategoryOpen ? (
        <>
          <div
            className={`overlay ${isNewCategoryOpen ? "open" : "closed"}`}
            onClick={() => closeAndClear()}
          ></div>
          <div
            className={`category-modal-window ${
              isNewCategoryOpen ? "open" : "closed"
            }`}
          >
            <CloseButton onClick={() => closeAndClear()} />
            <div className='new-category-input'>
              <input
                type='text'
                placeholder='New name'
                value={inputText}
                onChange={(e) => handleInputText(e)}
              />

              <button
                className='btn-standart'
                type='submit'
                onClick={() => {
                  handleAddNewCategory()
                }}
              >
                Add
              </button>
            </div>
          </div>
        </>
      ) : (
        <button
          className='category-btn category'
          aria-label='Add new category'
          onClick={() => setIsNewCategoryOpen(!isNewCategoryOpen)}
        >
          <IoIosAddCircle />
        </button>
      )}
    </>
  )
}

export default NewCategoryInput
