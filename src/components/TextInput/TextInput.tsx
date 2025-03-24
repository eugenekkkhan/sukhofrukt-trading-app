import React, { useEffect, useRef } from 'react'
import './TextInput.css'

interface TextInputProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
 color?: string;
}

const TextInput = ({ color = '', ...props }: TextInputProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(()=>{
		setTimeout(()=>{
			if (inputRef.current)
				inputRef.current.style.transition = 'background-color 300ms ease-out, color 300ms ease-out, box-shadow 300ms ease-out';
		}, 300)
	})

  return (
    <input
			ref={inputRef} 
    	type="text"
			className={`text-input ${color}`}
			{...props}
    />
  )
}

export default TextInput