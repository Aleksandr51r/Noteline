import React, { useState } from "react"
import { useTranslation } from "react-i18next"

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
        <div className='login-form'>
          <label htmlFor='exampleInputText' className='form-label'></label>
          <input
            type='text'
            className='login-forms-inputs'
            placeholder={t("username")}
            id='exampleInputUsername'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div className=''>
          <label htmlFor='exampleInputPassword1' className='form-label'></label>
          <input
            type='password'
            className='login-forms-inputs'
            id='exampleInputPassword1'
            placeholder={t("password")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        {/* <div className=' form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id='exampleCheck1'
          />
          <label className='form-check-label' htmlFor='exampleCheck1'>
            Check me out
          </label>
        </div> */}
        <button type='submit' className='btn-login-submit btn-standart'>
          Submit
        </button>
      </form>
      <div className='mt-3'>
        <p>
          {t("Don't have an account?")}{" "}
          <button className='btn-empty ' onClick={onChangeMode}>
            <span className='btn-create-new-acc'>
              {t("Create a new account")}
            </span>
          </button>
        </p>
      </div>
    </>
  )
}

export default LogIn
