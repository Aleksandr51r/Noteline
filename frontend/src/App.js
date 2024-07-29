import { useState } from "react"
import "./App.css"
import Welcome from "./components/AuthPages/Welcome"
import Application from "./components/AppPages/Application"


function App() {
  const [isLogged, setIsLogged] = useState(false)
  return <div className='App'>{isLogged ? <Application /> : <Welcome />}</div>
}

export default App
