import React from 'react'
import Books from '../Books/Books'

function Header() {
  return (
    <div className='header'>
        <div className='user-section'>
            <img src='/icons/user-line.svg' alt='user icon'/>
        </div>
        <Books/>
    </div>
  )
}

export default Header
