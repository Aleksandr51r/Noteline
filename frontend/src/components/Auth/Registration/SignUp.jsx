import React, { useTransition } from "react"
import { setError } from "../../../redux/slices/errorSlice"
import { useDispatch } from "react-redux"
// import api from "../../../api"
import { useState } from "react"
import { useTranslation } from "react-i18next"
// import { useNavigate } from "react-router-dom"
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants"

function SignUp({ handleSubmit }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    if (email && !emailRegex.test(email)) {
      dispatch(
        setError({
          errorMessage: t("Invalid email address"),
          typeOfToast: "error",
        })
      )
      setLoading(false)
      return
    }
    if (password !== confirmPassword) {
      dispatch(
        setError({
          errorMessage: t("Passwords do not match"),
          typeOfToast: "error",
        })

      )
      setLoading(false)
      return
    }
    try {

      handleSubmit(username.toLowerCase(), password, email)
    } catch{
      dispatch(
        setError({
          errorMessage: t("Name or email are already register"),
          typeOfToast: "error",
        }))

    }
  }


  return (
    <form
      className='form-horizontal'
      action=''
      method='POST'
      onSubmit={handleFormSubmit}
    >
      <fieldset>
        <div id='legend'>
          <legend className=''>{t("Register")}</legend>
        </div>
        <div className='control-group'>
          <label className='control-label' htmlFor='username'></label>
          <div className='controls'>
            <input
              type='text'
              id='username'
              name='username'
              placeholder={t("username")}
              className='login-forms-inputs'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              required
            />
            <p className='help-block'>
              {t("Username can contain any letters or numbers, without spaces")}
            </p>
          </div>
        </div>

        <div className='control-group'>
          <label className='control-label' htmlFor='email'></label>
          <div className='controls'>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Email'
              className='login-forms-inputs'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              required
            />
            <p className='help-block'>{t("Please provide your E-mail")}</p>
          </div>
        </div>

        <div className='control-group'>
          <label className='control-label' htmlFor='password'></label>
          <div className='controls'>
            <input
              type='password'
              id='password'
              name='password'
              placeholder={t("password")}
              className='login-forms-inputs'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required
            />
            <p className='help-block'>
              {t("Username can contain any letters or numbers, without spaces")}
            </p>
          </div>
        </div>

        <div className='control-group'>
          <label className='control-label' htmlFor='password_confirm'></label>
          <div className='controls'>
            <input
              type='password'
              id='password_confirm'
              name='password_confirm'
              placeholder={t("confirm password")}
              className='login-forms-inputs'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              required
            />
            <p className='help-block'>{t("Please confirm password")}</p>
          </div>
        </div>

        <div className='control-group'>
          <div className='controls'>
            <button className='btn btn-standart btn-reg'>Register</button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default SignUp
