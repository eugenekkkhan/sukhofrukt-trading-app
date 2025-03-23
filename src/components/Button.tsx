import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

const Button = ({text, onClick, ...props}: ButtonProps) => {
  return (
    <button onClick={onClick}
    {...props}
    >{text}</button>
  )
}

export default Button