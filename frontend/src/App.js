import { useEffect, useState } from "react"
import "./App.css"
import LandingPage from "./components/Auth/LandingPage"
import Application from "./components/App/Application"
import NotFound from "./components/Auth/NotFound"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigation,
  Navigate,
} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Error from "./components/Error/Error"

function LogOut() {
  localStorage.clear()
  return <LandingPage />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <LandingPage />
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      document.documentElement.setAttribute("savedTheme", savedTheme)
    }
  }, [])

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Application />
              </ProtectedRoute>
            }
          />
          <Route path='/landing-page' element={<LandingPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Error />
    </div>
  )
}

export default App

// function App() {
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme) {
//       document.documentElement.setAttribute("savedTheme", savedTheme)
//     }
//   }, [])

//   const [isLogged, setIsLogged] = useState(false)
//   return (
//     <div className='App'>{isLogged ? <Application /> : <LandingPage />}</div>
//   )
// }

// export default App
