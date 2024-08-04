import React from "react"
import FixedHeader from "../FixedHeader/FixedHeader"
import { Outlet } from "react-router-dom"

function TopBar() {
  return (
    <>
      <FixedHeader />
      <Outlet />
    </>
  )
}

export default TopBar
