import React from "react"
import ToolBar from "../Tools/ToolBar/ToolBar"
import ContentOfSelectedList from "../Logic/Content/ContentOfSelectedList"
import "./WorkSpace.css"

function WorkSpace() {
  return (
    <>
      <ToolBar />
      <hr />
      <div className='place-of-content'>
        <ContentOfSelectedList />
      </div>
    </>
  )
}

export default WorkSpace
