import React from 'react'

export function ColoredLine({ color = 'black', height = 1 }) {
  
  return (
    <hr style={{ 
      color:color,
      backgroundColor:color,
      height:height,
      borderColor:color
    }}/>
  )
}