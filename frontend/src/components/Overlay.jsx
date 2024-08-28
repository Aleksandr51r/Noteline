import React from "react"
import "./Overlay-style.css"

function Overlay({ onClick, addedClassName }) {
  return <div className={`overlay ${addedClassName}`} onClick={onClick}></div>
}

export default Overlay
