import  { useContext } from 'react'
import './PanelWithInfo.css'
import ThemeContext from '../../context/ThemeContext/ThemeContext';

type colorSchemeType = 'green' | 'coral';

const PanelWithInfo = ({text, color = 'green'}: {text: string, color?: colorSchemeType}) => {
	const context = useContext(ThemeContext);
  return (
    <div 
			className={context.theme === 'light' ? 
			`panel ${color}-lighter-bg ${color} light` : 
			`panel ${color}-bg ${color}-lighter light`}
		>
      {text}
    </div>
  )
}

export default PanelWithInfo