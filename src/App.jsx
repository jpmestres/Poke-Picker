import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import circleImage from './assets/Circle.svg'
import bellyButtonImage from './assets/BellyButton.svg'
import './App.css'

function App() {
  const [activePoint, setActivePoint] = useState(null)
  const [pickHistory, setPickHistory] = useState(() => {
    const savedHistory = Cookies.get('pickHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  useEffect(() => {
    Cookies.set('pickHistory', JSON.stringify(pickHistory), { expires: 7 })
  }, [pickHistory])

  const handlePick = () => {
    const points = document.querySelectorAll('.star-point')
    let randomIndex

    do {
      randomIndex = Math.floor(Math.random() * points.length)
    } while (pickHistory.includes(randomIndex))

    setActivePoint(randomIndex)
    setPickHistory(prevHistory => {
      const newHistory = [...prevHistory, randomIndex]
      if (newHistory.length > 4) {
        newHistory.shift()
      }
      return newHistory
    })
  }

  return (
    <>
      <div className="container">
        <img src={circleImage} alt="Circle" className="stomach" />
        <img src={bellyButtonImage} alt="Belly Button" className="belly-button" />
        <svg className="star" width="250" height="250" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="2" r="0.5" className={`star-point ${activePoint === 0 ? 'active' : ''}`} />
          <circle cx="22" cy="9" r="0.5" className={`star-point ${activePoint === 1 ? 'active' : ''}`} />
          <circle cx="18" cy="21" r="0.5" className={`star-point ${activePoint === 2 ? 'active' : ''}`} />
          <circle cx="6" cy="21" r="0.5" className={`star-point ${activePoint === 3 ? 'active' : ''}`} />
          <circle cx="2" cy="9" r="0.5" className={`star-point ${activePoint === 4 ? 'active' : ''}`} />
        </svg>
      </div>
      <div className="button-container">
        <button className="pick-button" onClick={handlePick}>Pick</button>
      </div>
    </>
  )
}

export default App
