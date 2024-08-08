import React from "react"
import "./Category-style.css"

function Category({ Icon: Icon = null, name, addedClassName = " " }) {
  return (
    <a className={`category ${addedClassName}`}>
      {Icon && <Icon />}
      <span>{name}</span>
    </a>
  )
}

export default Category
