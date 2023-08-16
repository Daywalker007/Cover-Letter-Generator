import React from 'react'

export default function CustomButton({text, handleClick, className, type = 'button', btnRef = null, ...props}) {
  
  // Adds '!' in front of all class names for tailwindcss
  // const newClasses =  className ? className.split(' ').filter(e => e !== 'undefined').map(e => {
  //   return e.includes(':') ? `${e.slice(0, e.lastIndexOf(':')+1)}!${e.slice(e.lastIndexOf(':')+1)}` : `${e}`
  // }).join(' ') : ''

  return (
    <button 
      ref={btnRef}
      type={type}
     onClick={handleClick}
     className={`px-10 border rounded-2xl my-15 text-lg font-semibold transition duration-300 ${className}`}>
      <span>{text}</span>
    </button>
  )
}
