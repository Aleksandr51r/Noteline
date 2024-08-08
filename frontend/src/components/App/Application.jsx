import React from "react"
import TopBar from "./layouts/TopBar"
import "./Application-style.css"
import "./Debug-Application-style copy.css"
import ContentList from "./Logic/Content/ContentList"
import WorkSpace from "./WorkSpace/WorkSpace"

function Application() {
  return (
    <>
      <TopBar />
      <div className='main-space'>
        <div className='category-group'>
          <ContentList />
        </div>

        <div className='work-space'>
          <WorkSpace />
        </div>
      </div>
    </>
  )
}

export default Application
