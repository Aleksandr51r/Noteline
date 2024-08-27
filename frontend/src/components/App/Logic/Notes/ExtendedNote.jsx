import React from "react"
import "./ExtendedNote-style.css"
import { useTranslation } from "react-i18next"
import { HiPencilSquare } from "react-icons/hi2"

function ExtendedNote({ onClick, title, content, tags }) {
  const { t } = useTranslation()
  return (
    <div className='overlay ' onClick={onClick}>
      <div className='opened-note'>
        <h2 className='extended-note-title'>{title}</h2>

        <div className='extended-note-control-panel'>
          <button className='btn-empty btn-reduct'>
            <HiPencilSquare className='btn-reduct-icon' />
          </button>
        </div>

        <div className='extended-note-content'>{content}</div>
        <div className='extended-note-tags'>{tags}</div>
      </div>
    </div>
  )
}

export default ExtendedNote
