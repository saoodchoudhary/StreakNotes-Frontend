import React, { useEffect } from 'react'

const Button = ({text , type , size }) => {
if (!type) {
    type = 'primary'
}
if (!size) {
    size = 'medium' 
}

  return (
    <div>
        <button className={`btn ${type} ${size}`}>{text || "Submit"}</button>
    </div>
  )
}

export default Button
