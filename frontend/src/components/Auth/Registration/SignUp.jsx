import React from "react"

// import api from "../../../api"
import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants"

function SignUp({ handleSubmit }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleSubmit(username.toLowerCase(), password)
  }

  // const [loading, setLoading] = useState(false)
  // const navigate = useNavigate()

  // const handleSubmit = async (e) => {
  //   setLoading(true)
  //   e.preventDefault()

  //   try {
  //     const res = await api.post(route, { username, password })
  //     if (method === "login") {
  //       localStorage.setItem(ACCESS_TOKEN, res.data.access)
  //       localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
  //       navigate("/")
  //     } else {
  //       navigate("/")
  //     }
  //   } catch (error) {
  //     alert(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <form
      className='form-horizontal'
      action=''
      method='POST'
      onSubmit={handleFormSubmit}
    >
      <fieldset>
        <div id='legend'>
          <legend className=''>Register</legend>
        </div>
        <div className='control-group'>
          {/* Username */}
          <label className='control-label' htmlFor='username'>
            Username
          </label>
          <div className='controls'>
            <input
              type='text'
              id='username'
              name='username'
              placeholder=''
              className='input-xlarge'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            <p className='help-block'>
              Username can contain any letters or numbers, without spaces
            </p>
          </div>
        </div>

        {/* <div className='control-group'>
          <label className='control-label' htmlFor='email'>
            E-mail
          </label>
          <div className='controls'>
            <input
              type='text'
              id='email'
              name='email'
              placeholder=''
              className='input-xlarge'
            />
            <p className='help-block'>Please provide your E-mail</p>
          </div>
        </div> */}

        <div className='control-group'>
          {/* Password */}
          <label className='control-label' htmlFor='password'>
            Password
          </label>
          <div className='controls'>
            <input
              type='password'
              id='password'
              name='password'
              placeholder=''
              className='input-xlarge'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <p className='help-block'>
              Password should be at least 4 characters
            </p>
          </div>
        </div>

        {/* Password Confirm */}
        {/* <div className='control-group'>
          <label className='control-label' htmlFor='password_confirm'>
            Password (Confirm)
          </label>
          <div className='controls'>
            <input
              type='password'
              id='password_confirm'
              name='password_confirm'
              placeholder=''
              className='input-xlarge'
            />
            <p className='help-block'>Please confirm password</p>
          </div>
        </div> */}

        <div className='control-group'>
          {/* Button */}
          <div className='controls'>
            <button className='btn btn-success'>Register</button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default SignUp
