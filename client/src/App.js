//This is the react file that will call components in return
import React from 'react'
import Header from './components/Header/Header'
import './App.css'

function App() {
  return (
    //every return needs to be encapsulated in <></> or a single div like below
    <div>
      <Header />
    </div>
    
  )
}

export default App
