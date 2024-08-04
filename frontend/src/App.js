import { useEffect, useState } from "react"
import "./App.css"
import Starting from "./components/Auth/Starting"
import Application from "./components/App/Application"

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      document.documentElement.setAttribute("savedTheme", savedTheme)
    }
  }, [])

  const [isLogged, setIsLogged] = useState(true)
  return <div className='App'>{isLogged ? <Application /> : <Starting />}</div>
}

export default App
