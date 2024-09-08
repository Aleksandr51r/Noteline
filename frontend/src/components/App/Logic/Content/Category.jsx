import React, { useEffect, useState } from "react"
import "./Category-style.css"
import { RiToolsFill } from "react-icons/ri"
import { Icon_stock } from "./icons/icons"
import Overlay from "../../../Overlay"
import IconPicker from "./icons/IconPicker"
import "./CategorySettings-style.css"
import { useDispatch } from "react-redux"
import {
  deleteCategoryAsync,
  fetchCategories,
  modifyCategoryAsync,
} from "../../../../redux/slices/contentSlice"

function Category({
  id,
  icon = "default",
  name,
  addedClassName = "",
  onClick,
  categoryListRefresh,
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isChoosingIcon, setIsChoosingIcon] = useState(false)
  const [isWeDeleteCategory, setIsWeDeleteCategory] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(icon)
  const [selectedName, setSelectedName] = useState(name)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
    console.log("sended2")
  }, [dispatch])

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName)
    onClose()
  }

  const handleDeleteCategory = () => {
    setIsWeDeleteCategory(true)
  }

  const confirmDeleteCategory = (id) => {
    console.log("id", id)
    dispatch(deleteCategoryAsync({ id }))
    onClose()
    setIsSettingsOpen(false)
    categoryListRefresh()
  }

  const cancelDeleteCategory = () => {
    onClose()
  }

  const handleModifyName = (e) => {
    setSelectedName(e.target.value)
    console.log("selectedName", selectedName)
  }
  const handleSettingOfCategory = () => {
    setIsSettingsOpen(true)
  }

  const handleSettingOfIcon = () => {
    setIsChoosingIcon(true)
  }

  const handleSubmiteModifyCategory = (id, selectedIcon, selectedName) => {
    console.log("selectedName", selectedName)
    console.log("{ id, name: selectedName, icon: selectedIcon }", {
      id,
      name: selectedName,
      icon: selectedIcon,
    })

    dispatch(
      modifyCategoryAsync({ id, name: selectedName, icon: selectedIcon })
    )

    onClose()
    categoryListRefresh()
  }

  const onClose = () => {
    if (isChoosingIcon) {
      setIsChoosingIcon(false)
    } else if (isWeDeleteCategory) {
      setIsWeDeleteCategory(false)
    } else {
      setIsSettingsOpen(false)
    }
  }
  const cancelAndClose = () => {
    setSelectedIcon(icon)
    setSelectedName(name)
    onClose()
  }

  const addedIconClassName = addedClassName ? "settings-icon" : null
  return (
    <>
      {isSettingsOpen ? (
        <>
          <Overlay
            onClick={cancelAndClose}
            addedClassName={`${
              isChoosingIcon || isWeDeleteCategory ? "levelHigher" : ""
            }`}
          />
          {isChoosingIcon ? (
            <div className='mb-center'>
              <IconPicker onSelectIcon={handleIconSelect} />
            </div>
          ) : isWeDeleteCategory ? (
            <div className='mb-center'>
              <button
                className='btn-empty '
                onClick={() => confirmDeleteCategory(id)}
              >
                ok
              </button>
              <button className='btn-empty ' onClick={cancelDeleteCategory}>
                no
              </button>
            </div>
          ) : (
            <div className='mb-center'>
              <div className='category-options-settings'>
                <button
                  onClick={handleSettingOfIcon}
                  className='btn-empty btn-icon-settings'
                >
                  {Icon_stock[selectedIcon] || Icon_stock["default"]}
                </button>
                <input
                  value={selectedName}
                  onChange={handleModifyName}
                  className='input-cat-name-settings'
                />
                <button
                  className='btn-empty btn-delete-settings'
                  onClick={handleDeleteCategory}
                >
                  {Icon_stock[`todelete`]}
                </button>
              </div>
              <div className='red-border delete-cat-setings-btn'></div>
              <div className='red-border apply-setings-btns'>
                <button
                  className='btn-empty btn-apply-settings'
                  onClick={() =>
                    handleSubmiteModifyCategory(id, selectedIcon, selectedName)
                  }
                >
                  Apply
                </button>
                <button className='btn-empty ' onClick={cancelAndClose}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}
      <a className={`category ${addedClassName}`} onClick={onClick}>
        <div className='category-icon'>
          {Icon_stock[selectedIcon] || Icon_stock["default"]}
        </div>
        <span className='category-span-name'>{selectedName}</span>
        <button
          className={`btn-empty  category-settings`}
          onClick={handleSettingOfCategory}
        >
          <RiToolsFill
            className={`category-settings-icon ${addedIconClassName}`}
          />
        </button>
      </a>
    </>
  )
}

export default Category
