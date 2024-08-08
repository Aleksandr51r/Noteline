import { useEffect, useState } from "react"
import "./App.css"
import Starting from "./components/Auth/Starting"
import Application from "./components/App/Application"
import Error from "./components/Error/Error"

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      document.documentElement.setAttribute("savedTheme", savedTheme)
    }
  }, [])

  const [isLogged, setIsLogged] = useState(true)
  return (
    <div className='App'>
      {isLogged ? <Application /> : <Starting />}
      <Error />
    </div>
  )
}

export default App
