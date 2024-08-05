import React from "react"
import "./Category-style.css"

function Category({ name, Icon }) {
  return (
    <a className='category'>
      <span>
        <Icon /> {name}
      </span>
    </a>
  )
}

export default Category
