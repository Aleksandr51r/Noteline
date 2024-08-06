import React from "react"
import "./NewCategory-style.css"
import { useState } from "react"
import { IoIosAddCircle } from "react-icons/io"
import CloseButton from "../../../../../UI/closeButton/CloseButton"
import { useTranslation } from "react-i18next"
// import ColorPicker from "../../../color/ColorPicker"

function NewCategory() {
  const { t } = useTranslation()

  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false)
  const [inputText, setInputText] = useState("")

  const handleInputText = (e) => {
    setInputText(e.target.value)
    console.log(inputText)
  }

  const handleAddNewCategory = () => {
    console.log("sendedText", inputText)
    setInputText("")
    setIsNewCategoryOpen(!isNewCategoryOpen)
  }

  return (
    <>
      {isNewCategoryOpen ? (
        <>
          <div
            className={`overlay ${isNewCategoryOpen ? "open" : "closed"}`}
            onClick={() => setIsNewCategoryOpen(!isNewCategoryOpen)}
          ></div>
          <div
            className={`category-modal-window ${
              isNewCategoryOpen ? "open" : "closed"
            }`}
          >
            <CloseButton
              onClick={() => setIsNewCategoryOpen(!isNewCategoryOpen)}
            />
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

export default NewCategory
