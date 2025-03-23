import React from 'react'
import ThemeContext from './ThemeContext'

const ThemeProvider = ({children}: {children: React.ReactNode}) => {

  return (
    <ThemeContext.Provider value={{theme: "light", toggleTheme: () => {}}}>
			{children}
		</ThemeContext.Provider>
  )
}

export default ThemeProvider