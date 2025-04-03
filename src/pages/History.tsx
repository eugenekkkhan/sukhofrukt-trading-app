import "../layout.css";
import { GoHistory } from "react-icons/go";

const History = () => {
  return (
    <div className="flex-column basic-block bottom-border">
			<div className="flex-row gap">
				<div className="rotate icon">
					<GoHistory size='100%'/>
				</div>
				<h1>История</h1>
			</div>
		</div>
  )
}

export default History