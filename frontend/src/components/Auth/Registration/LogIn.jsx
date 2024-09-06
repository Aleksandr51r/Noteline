import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import SingUp from "./SignUp"
import { GiArrowWings } from "react-icons/gi"

function LogIn({ onChangeMode, handleSubmit }) {
  const { t } = useTranslation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleSubmit(username.toLowerCase(), password)
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='mb-3'>
          <label htmlFor='exampleInputText' className='form-label'>
            Username
          </label>
          <input
            type='text'
            className='form-control'
            id='exampleInputUsername'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className='mb-3 form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id='exampleCheck1'
          />
          <label className='form-check-label' htmlFor='exampleCheck1'>
            Check me out
          </label>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      <div className='mt-3'>
        <p>
          Don't have an account?{" "}
          <button className='btn-empty' onClick={onChangeMode}>
            Create a new account
          </button>
        </p>
      </div>
    </>
  )
}

export default LogIn
