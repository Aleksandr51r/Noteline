import React from "react"
import "./Category-style.css"

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
