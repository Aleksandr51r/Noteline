import React from "react"
import "./Category-style.css"
import { FaRegTrashCan } from "react-icons/fa6"
import { IoBookmarksSharp } from "react-icons/io5"
import { GrSort } from "react-icons/gr"
import { BsKanban } from "react-icons/bs"

function Category({
  Icon: Icon = null,
  name,
  addedClassName = "",
  addedIconClassName = "",
  onClick,
}) {
  return (
    <a className={`category ${addedClassName}`} onClick={onClick}>
      {Icon && <Icon className={`category-icon ${addedIconClassName}`} />}
      <span>{name}</span>
    </a>
  )
}

export default Category
