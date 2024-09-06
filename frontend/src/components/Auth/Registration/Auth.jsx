import React, { useState } from "react"
import Overlay from "../../Overlay"
import SignUp from "./SignUp"
import LogIn from "./LogIn"
import ModalWindow from "../../ModalWindow/ModalWindow"

function Auth({ isModalOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(isModalOpen)
  const [isForSignUp, setIsForSignUp] = useState(false)
  const handleMode = (value = !isForSignUp) => {
    setIsForSignUp(value)
  }
  const closeAndClear = () => {
    setIsModalOpen(false)
    setIsForSignUp(false)
  }

  return (
    <>
      {isModalOpen && (
        <>
          <Overlay onClick={closeAndClear} />
          {isForSignUp ? (
            <ModalWindow
              title='SignUp'
              Component={SignUp}
              onChangeMode={handleMode}
              closeModal={closeAndClear}
            />
          ) : (
            <ModalWindow
              title='registration'
              Component={LogIn}
              onChangeMode={handleMode}
              closeModal={closeAndClear}
            />
          )}
        </>
      )}
    </>
  )
}
export default Auth
