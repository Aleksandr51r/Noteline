import {
  Slider,
  Sketch,
  Material,
  Colorful,
  Compact,
  Circle,
  Wheel,
  Block,
  Github,
  Chrome,
} from "@uiw/react-color"
import {
  Alpha,
  Hue,
  ShadeSlider,
  Saturation,
  Interactive,
  hsvaToHslaString,
} from "@uiw/react-color"
import {
  EditableInput,
  EditableInputRGBA,
  EditableInputHSLA,
} from "@uiw/react-color"

import { useState } from "react"
import "./ColorPicker-style.css"
import Overlay from "../../ModalWindow/Overlay/Overlay"

function ColorPicker() {
  const [hex, setHex] = useState("#fff")
  const [isPickerVisible, setPickerVisible] = useState(false)

  return (
    <div className='color-picker-container'>
      <div
        className='color-picker-display'
        style={{ backgroundColor: hex }}
        onClick={() => setPickerVisible(!isPickerVisible)}
      >
        {}
      </div>
      {isPickerVisible && (
        <>
          <div className='color-picker-popup'>
            <Sketch color={hex} onChange={(color) => setHex(color.hex)} />
          </div>
          <Overlay />
        </>
      )}
    </div>
  )
}

export default ColorPicker
