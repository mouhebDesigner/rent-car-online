import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import Header from './components/Header';
import Slider from './components/Slider';
import Car from './components/Car';


function App() {
  const [count, setCount] = useState(0)
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/recipe')
      .then(res => res.json())
      .then(data => setRecipes(data))
  }, [])

  return (
    <>
      <Header />
      <Slider />
      <Car />

   

    </>
  )
}

export default App
